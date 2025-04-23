const BASE_URL = "http://localhost:5141/"; 

const withAuth = (headers = {}) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export async function getUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      headers: withAuth({ "Content-Type": "application/json" }),
    });

    if (!response.ok) {
      console.error(`Error retrieving user ${userId}: ${response.status}`);
      return null;
    }

    const user = await response.json();
    console.log("Retrieved user data:", user);
    return user;
  } catch (error) {
    console.error("Error during getUser:", error);
    return null;
  }
}

export async function createUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: "POST",
      headers: withAuth({ "Content-Type": "application/json" }),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.error(`Error creating user: ${response.status}`);
      return null;
    }

    const newUser = await response.json();
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error during createUser:", error);
    return null;
  }
}

export async function updateUser(userId, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      headers: withAuth({ "Content-Type": "application/json" }),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      console.error(`Error updating user ${userId}: ${response.status}`);
      return null;
    }

    const updatedUser = await response.json();
    console.log("User updated:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error during updateUser:", error);
    return null;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
      headers: withAuth(),
    });

    if (!response.ok) {
      console.error(`Error deleting user ${userId}: ${response.status}`);
      return false;
    }

    console.log("User deleted successfully");
    return true;
  } catch (error) {
    console.error("Error during deleteUser:", error);
    return false;
  }
}
