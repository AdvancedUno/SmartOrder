CREATE TABLE Orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderNumber VARCHAR(36),
    CustomerName VARCHAR(100),
    Address VARCHAR(200),
    CreatedAt DATETIME,
    TotalPrice DECIMAL(10,2),
    Status VARCHAR(20)
);

CREATE TABLE OrderItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT,
    ItemName VARCHAR(100),
    StoreName VARCHAR(100),
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    Subtotal DECIMAL(10,2),
    FOREIGN KEY (OrderId) REFERENCES Orders(Id)
);
