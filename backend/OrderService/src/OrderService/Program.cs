using OrderService.Repositories;
using OrderService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//string? connectionString = builder.Configuration.GetConnectionString("MySqlConnection");
//string? connectionString = "Server=mysql-service-headless;Database=db;User=myuser;Password=mypassword;";
string? connectionString = "Server=mysql-service;Database=db;User=myuser;Password=mypassword;";


builder.Services.AddScoped<IOrderRepository>(sp => new OrderRepository(connectionString));



builder.Services.AddSingleton<AnalysisClient>();
builder.Services.AddSingleton<NotificationClient>();

var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .WithOrigins("http://localhost:3000"));

app.MapControllers();

app.Run();
