const BASE_URL = "http://localhost:5141/";

async function apiRequest(url, method = "GET", body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
}

async function createUserPublicId() {
  const url = `${BASE_URL}/account/user/create-public-id`;
  return await apiRequest(url, "POST");
}

async function performUserCreation(details, publicId) {
  const url = `${BASE_URL}/account/user/create`;
  const body = { ...details, publicId };
  return await apiRequest(url, "POST", body);
}

async function getUserPrivateId(publicId) {
  const url = `${BASE_URL}/account/user/private-id/${publicId}`;
  return await apiRequest(url);
}

async function getUserDetails(userId) {
  const url = `${BASE_URL}/account/user/details/${userId}`;
  return await apiRequest(url);
}

async function getPublicIdBySession() {
  const url = `${BASE_URL}/account/user/public-id/session`;
  return await apiRequest(url);
}

async function setUserRecordToVerified(userId) {
  const url = `${BASE_URL}/account/user/verify/${userId}`;
  return await apiRequest(url, "POST");
}