using System.Net.Http.Json;
using OrderService.Models;

namespace OrderService.Services
{
    public class AnalysisClient
    {
        private readonly HttpClient _httpClient;

        public AnalysisClient(IConfiguration configuration)
        {
            var baseUrl = "http://analysis-service:5001";
            _httpClient = new HttpClient { BaseAddress = new Uri(baseUrl) };
        }

        public async Task<List<OptimizedItemDto>> GetOptimizedPlanAsync(OrderRequestDto cartItems)
        {
            cartItems.Address="Washington DC";
            var response = await _httpClient.PostAsJsonAsync("/api/analyze", cartItems);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<List<OptimizedItemDto>>();
            return result ?? new List<OptimizedItemDto>();
        }
    }
}
