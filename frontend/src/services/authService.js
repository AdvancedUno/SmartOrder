
export async function login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "mock-jwt-token",
          userId: 123,
          userName: email.split("@")[0] 
        });
      }, 1000); 
    });
  }
  
  export async function fetchUserOrders() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
        resolve(storedOrders);
      }, 500);
    });
  }