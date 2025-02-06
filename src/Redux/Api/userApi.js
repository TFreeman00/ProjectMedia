const BASE_URL = "http://localhost:5141/api/Account";

export async function getUser(userId) {
  try {
    const token = localStorage.getItem("authToken"); 
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {

    }

    const user = await response.json();
    console.log("Retrieved user data:", user);
    return user;
  } catch (error) {

  }
}

export async function createUser(userData) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const newUser = await response.json();
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    
  }
}

export async function updateUser(userId, updatedData) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
   
    }

    const updatedUser = await response.json();
    console.log("User updated:", updatedUser);
    return updatedUser;
  } catch (error) {
   
  }
}

export async function deleteUser(userId) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/${userId}`, { 
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("User deleted successfully");
    }
  } catch (error) {
  }
}