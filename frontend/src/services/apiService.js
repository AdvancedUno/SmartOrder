const ORDER_SERVICE_URL = "http://unolee.com";

export async function fetchStoreItems() {
  return [
    {
      id: 1,
      name: "Apple",
      store: ["StoreA", "StoreB", "StoreC", "StoreD"],
      path: "img/apple.jpg",
    },
    {
      id: 2,
      name: "Banana",
      store: ["StoreA", "StoreB", "StoreC", "StoreD"],
      path: "img/banana.jpg",
    },
    {
      id: 3,
      name: "Bike",
      store: ["StoreA", "StoreC"],
      path: "img/bike.jpg",
    },
    {
      id: 4,
      name: "Cereal",
      store: ["StoreB", "StoreD"],
      path: "img/cereal.jpg",
    },
    {
      id: 5,
      name: "Coke",
      store: ["StoreA", "StoreB", "StoreD"],
      path: "img/coke.jpg",
    },
    {
      id: 6,
      name: "Milk",
      store: ["StoreA", "StoreC"],
      path: "img/milk.jpg",
    },
    {
      id: 7,
      name: "Potato",
      store: ["StoreB", "StoreD"],
      path: "img/potato.jpg",
    },
    {
      id: 8,
      name: "Rice",
      store: ["StoreA", "StoreC", "StoreD"],
      path: "img/rice.jpg",
    },
  ];
}


export async function placeOrder(cartItems, customerName, customerRequest, address) {
  const body = {
    customerName,
    address,
    customerRequest,
    cartItems: cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    })),
  };

  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Order creation failed: ${response.statusText}`);
    }

    const result = await response.json();


    const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];


    existingOrders.push(result);


    localStorage.setItem("userOrders", JSON.stringify(existingOrders));

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrderById(orderId) {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders/${orderId}`);
    if (!response.ok) {
      throw new Error(`Failed to get order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
