# 🛒 Smart Order - Grocery Optimization Web App

Smart Order is a web application that allows users to order groceries online from multiple stores. It finds the most optimal way to place orders while considering store minimum order constraints.

---

## 🚀 Features
- **🛍️ Smart Grocery Ordering** - Automatically finds the best way to order items from multiple stores.
- **🔄 Optimization with Palantir OSDK** - Uses semantic search and optimization for item matching and pricing.
- **📦 Microservices Architecture** - Built with **.NET 8 (C#)** for Order & Notification Services, and **Python** for the Analysis Service.
- **📡 Kubernetes & Docker Deployment** - Runs efficiently with containerized microservices.
- **💳 User Authentication (Mocked)** - Login system to view and track past orders.
- **🛒 Shopping Cart & Order Tracking** - Users can add items to the cart and track order history.

---

## 🏗️ Project Structure

![image](https://github.com/user-attachments/assets/c9e62543-a0c9-406f-bf9e-6f57a2c59040)





```
SmartOrder/
├── backend/
│   ├── OrderService/  (C# - .NET 8, MySQL, Dapper)
│   ├── AnalysisService/ (Python - Palantir OSDK, FastAPI)
│   ├── NotificationService/ (C# - .NET 8, RabbitMQ)
│
├── frontend/ (React, MUI, Context API)
│   ├── public/img/ (Product Images)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│
└── README.md 
```

---

## ⚙️ Technologies Used

### **Frontend:**
- React (Context API, React Router)
- Material UI (MUI) for styling
- Fetch API for backend communication

### **Backend:**
- **Order Service:** C# (.NET 8, MySQL, Dapper)
- **Analysis Service:** Python (FastAPI, Palantir OSDK)
- **Notification Service:** C# (RabbitMQ)

### **Deployment & DevOps:**
- Docker & Docker Compose
- Kubernetes
- Nginx (Reverse Proxy)
- MySQL (Database for Orders)

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/SmartOrder.git
cd SmartOrder
```

### **2️⃣ Setup the Backend (Microservices)**
#### **Using Docker Compose (Recommended)**
```bash
docker-compose up --build
```
This will start **Order Service (C#)**, **Analysis Service (Python)**, **MySQL**, and **Notification Service (C#)**.

#### **Manually Running Each Service**
**Order Service:**
```bash
cd backend/OrderService
dotnet run
```
**Analysis Service:**
```bash
cd backend/AnalysisService
uvicorn main:app --host 0.0.0.0 --port 5001
```
**Notification Service:**
```bash
cd backend/NotificationService
dotnet run
```

### **3️⃣ Start the Frontend**
```bash
cd frontend
npm install
npm start
```
Frontend will be available at `http://localhost:3000`

---

## 🛠️ API Endpoints

### **Order Service (C# - .NET 8) 
| Method | Endpoint          | Description             |
|--------|------------------|-------------------------|
| POST   | `/api/orders`     | Place an order         |
| GET    | `/api/orders/{id}`| Get a specific order   |

### **Analysis Service (Python - FastAPI) 
| Method | Endpoint              | Description                     |
|--------|----------------------|---------------------------------|
| POST   | `/api/analysis`       | Get optimized order plan       |

---

## 📌 Known Issues & Future Improvements
- ✅ Improve real-time order tracking with **WebSockets**.
- ✅ Implement **real user authentication** (currently mocked).
- ✅ Expand **store selection** and **price matching accuracy**.


