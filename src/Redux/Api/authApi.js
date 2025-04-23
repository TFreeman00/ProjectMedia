const BASE_URL = "http://localhost:5141/auth"; 

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Login failed.");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function signup(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Signup failed.");
    }

    return true; 
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

export async function verifyAccount(inviteCode, verifyCode) {
  try {
    const response = await fetch(
      `${BASE_URL}/verify?invite=${inviteCode}&code=${verifyCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      let errorMessage = "Verification failed.";
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Account verified!", result);
    return result;
  } catch (error) {
    console.error("Error verifying account:", error.message);
    throw error;
  }
}
