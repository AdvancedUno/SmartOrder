using OrderService.Models;

namespace OrderService.Repositories
{
    public interface IOrderRepository
    {
        Task<int> CreateOrderAsync(Order order, List<OrderItem> items);
        Task<Order?> GetOrderByIdAsync(int orderId);
    }
}
