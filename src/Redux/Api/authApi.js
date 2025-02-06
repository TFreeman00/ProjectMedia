const BASE_URL = "http://localhost:5141/api/Account"; 

export async function verifyAccount(inviteCode, verifyCode) {
  try {
    const response = await fetch(`${BASE_URL}/verify?invite=${inviteCode}&code=${verifyCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        if (errorData.message) {
          throw new Error(errorData.message);
        }
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error("Verification failed.");
    }

    const result = await response.json();
    console.log("Account verified!", result);
    return result;
  } catch (error) {
    console.error("Error verifying account:", error.message);
    throw error;
  }
}

export async function checkUsernameExists(username) {
  try {
    const response = await fetch(`/Account/user/check?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      if (data.exists) {
        console.log("Username already exists");
      } else {
        console.log("Username is available");
      }
    } else {
      const errorData = await response.json();
      console.error("Username check failed:", errorData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const inviteCode = "abcd1234EF";
const verifyCode = "123456";
verifyAccount(inviteCode, verifyCode);

const username = "testuser";
checkUsernameExists(username);