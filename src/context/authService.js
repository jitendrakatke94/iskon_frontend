export const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5454/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status == false) {
        throw new Error("Login failed");
      }
  
      const userData = await response.json();
    //   console.log('userData', userData);
      return userData.response; // Return user data to store in context
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };
  
  export const logout = () => {
    // No need to remove anything since we are not using localStorage
  };