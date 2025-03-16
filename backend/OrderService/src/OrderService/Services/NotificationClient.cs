using System.Net.Http.Json;
using OrderService.Models;

namespace OrderService.Services
{
    public class NotificationClient
    {
        private readonly HttpClient _httpClient;

        public NotificationClient(IConfiguration configuration)
        {
            var baseUrl = configuration["NotificationServiceUrl"] ?? "http://localhost:5002";
            _httpClient = new HttpClient { BaseAddress = new Uri(baseUrl) };
        }

        public async Task SendOrderConfirmationAsync(Order order)
        {
            var payload = new
            {
                orderId = order.Id,
                orderNumber = order.OrderNumber,
                customerName = order.CustomerName,
                address = order.Address,
                totalPrice = order.TotalPrice,
                createdAt = order.CreatedAt
            };

            var response = await _httpClient.PostAsJsonAsync("/api/notifications/order-confirmation", payload);
            response.EnsureSuccessStatusCode();
        }
    }
}
