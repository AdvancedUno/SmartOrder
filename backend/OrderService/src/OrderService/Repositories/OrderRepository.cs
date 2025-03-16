using Dapper;
using MySql.Data.MySqlClient;
using OrderService.Models;

namespace OrderService.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly string _connectionString;

        public OrderRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<int> CreateOrderAsync(Order order, List<OrderItem> items)
        {
            int orderId = 0;
            try{
                Console.WriteLine($"Creating order for {order.CustomerName}");
                orderId = new Random().Next(1000, 9999);
            // using var connection = new MySqlConnection(_connectionString);
            // await connection.OpenAsync();

            // Console.WriteLine("Connected to database.");

            // // Insert into Orders
            // string insertOrderSql = @"
            //     INSERT INTO Orders 
            //         (OrderNumber, CustomerName, Address, CreatedAt, TotalPrice, Status)
            //     VALUES
            //         (@OrderNumber, @CustomerName, @Address, @CreatedAt, @TotalPrice, @Status);
            //     SELECT LAST_INSERT_ID();
            // ";

            // orderId = await connection.ExecuteScalarAsync<int>(insertOrderSql, new
            // {
            //     order.OrderNumber,
            //     order.CustomerName,
            //     order.Address,
            //     CreatedAt = order.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
            //     order.TotalPrice,
            //     order.Status
            // });
            // Console.WriteLine($"Inserted order with ID: {orderId}");

            // // Insert items
            // string insertItemSql = @"
            //     INSERT INTO OrderItems
            //         (OrderId, ItemName, StoreName, Quantity, UnitPrice, Subtotal)
            //     VALUES
            //         (@OrderId, @ItemName, @StoreName, @Quantity, @UnitPrice, @Subtotal);
            // ";

            // foreach (var item in items)
            // {
            //     await connection.ExecuteAsync(insertItemSql, new
            //     {
            //         OrderId = orderId,
            //         item.ItemName,
            //         item.StoreName,
            //         item.Quantity,
            //         item.UnitPrice,
            //         item.Subtotal
            //     });
            // }
            // Console.WriteLine($"Inserted {items.Count} items.");

            }
            catch(Exception e){
                Console.WriteLine(e.Message);
            }
            

            return orderId;
        }

        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            // using var connection = new MySqlConnection(_connectionString);
            // await connection.OpenAsync();

            // // Get order
            // string orderSql = @"
            //     SELECT * 
            //     FROM Orders
            //     WHERE Id = @orderId
            // ";

            // var order = await connection.QuerySingleOrDefaultAsync<Order>(orderSql, new { orderId });

            // if (order == null) return null;

            // // Get items
            // string itemsSql = @"
            //     SELECT *
            //     FROM OrderItems
            //     WHERE OrderId = @orderId
            // ";

            // var items = await connection.QueryAsync<OrderItem>(itemsSql, new { orderId });
            // order.Items = items.ToList();

            return null;
        }
    }
}
