namespace OrderService.Models
{
    public class OptimizedItemDto
    {
        public string ItemName { get; set; } = "";
        public string StoreName { get; set; } = "";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
