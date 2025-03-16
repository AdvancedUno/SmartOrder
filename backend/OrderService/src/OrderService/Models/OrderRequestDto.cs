namespace OrderService.Models
{
    public class OrderRequestDto
    {
        public string CustomerName { get; set; } = "";
        public string Address { get; set; } = "";
        public string CustomerRequest { get; set; } = "";
        public List<CartItemDto> CartItems { get; set; } = new();

    }

    public class CartItemDto
    {
        public string Name { get; set; } = "";
        public int Quantity { get; set; }
    }
}
