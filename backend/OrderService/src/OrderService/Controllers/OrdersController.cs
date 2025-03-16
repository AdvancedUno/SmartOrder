using Microsoft.AspNetCore.Mvc;
using OrderService.Models;
using OrderService.Repositories;
using OrderService.Services;

namespace OrderService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;
        private readonly AnalysisClient _analysisClient;
        private readonly NotificationClient _notificationClient;

        public OrdersController(
            IOrderRepository orderRepo,
            AnalysisClient analysisClient,
            NotificationClient notificationClient)
        {
            _orderRepo = orderRepo;
            _analysisClient = analysisClient;
            _notificationClient = notificationClient;
        }

        // POST api/orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequestDto orderRequest)
        {
            if (orderRequest is null || !orderRequest.CartItems.Any())
                return BadRequest("No items in the order.");

            Console.WriteLine($"Received order request from {orderRequest.CustomerName}");

            var optimizedItems = await _analysisClient.GetOptimizedPlanAsync(orderRequest);

            Console.WriteLine($"Optimized {orderRequest.CartItems.Count()} items to {optimizedItems.Count()} items.");

            var newOrder = new Order
            {
                CustomerName = orderRequest.CustomerName,
                Address = orderRequest.Address,
                CreatedAt = DateTime.UtcNow,
                Status = "Created"
            };

            decimal totalPrice = 0m;
            List<OrderItem> orderItems = new();

            foreach (var optItem in optimizedItems)
            {
                var subtotal = optItem.Price * optItem.Quantity;
                totalPrice += subtotal;

                orderItems.Add(new OrderItem
                {
                    ItemName = optItem.ItemName,
                    StoreName = optItem.StoreName,
                    Quantity = optItem.Quantity,
                    UnitPrice = optItem.Price,
                    Subtotal = subtotal
                });
            }

            newOrder.TotalPrice = totalPrice;

            var orderId = await _orderRepo.CreateOrderAsync(newOrder, orderItems);

            var createdOrder = await _orderRepo.GetOrderByIdAsync(orderId);
            // if (createdOrder != null)
            // {
            //     await _notificationClient.SendOrderConfirmationAsync(createdOrder);
            // }

            return Ok(new
            {
                OrderId = orderId,
                OrderNumber = orderId, //createdOrder?.OrderNumber,
                TotalPrice = totalPrice,
                OrderItems = orderItems
            });
        }

        // GET api/orders/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderRepo.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(order);
        }
    }
}
