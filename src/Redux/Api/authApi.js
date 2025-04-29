// const BASE_URL = "http://localhost:5141/auth"; 
import { sendRequest } from "./apiIntegration";


const baseUrl = "auth";

export async function login(username, password) {
  try {

    const endPoint = `${baseUrl}`;

    const reqBody = {
      "method" : "POST",
      "body": { username, password }, 
      "needAuthToken" : false,
      "isFileUpload" : false
    };

    const resp = await sendRequest(endPoint, reqBody);

    // TODO: add token to local storage
    localStorage.setItem("token", resp.token);
    return resp;
    
  } catch (error) {
    console.error("authApi.login error:", error);
    throw "login failed";
  }
}

export async function signup(username, password) {
  const endpoint = `${baseUrl}/signup`;
  
  try {

  const reqBody = {
    "method" : "POST", 
    "body":{ "username" : username, "password": password }, 
    "needAuthToken" : false,
    "isFileUpload" : false
  };


    const response = await sendRequest(endpoint,reqBody)

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
