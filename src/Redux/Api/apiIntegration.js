const baseUrl = "https://localhost: 5141/";



export async function sendRequest(endpoint, req) {
    try {

    let requestOptions;

    let headers;

    if (props.needToken){
        const token = await getItemInAppStorage("token");
        // headers = {"Content-Type": "application/json", "CVA-TOKEN" : token};
        headers = {"Content-Type": "application/json", "Authorization" : `Bearer ${token}` };
    } else if(props.isFileUpload) {
        headers = {"Content-Type": "multipart/form-data"};
    }
    else {
        headers = {"Content-Type": "application/json"};
    }


    if (props.isFileUpload) {
        requestOptions = {
            method: props.method,
            headers: headers
        }
    } else if (props.method === "POST") {
        requestOptions = {
            method: props.method,
            headers: headers,
            body: JSON.stringify(props.reqData)

        }
    } else if (props.method === "GET") {
        requestOptions = {
            method: props.method,
            headers: headers
        }
    }

    const response = await fetch(`${baseUrl}${endpoint}`, requestOptions );
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.message);
        }
    
        const data = await response.json();    
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}




async function getItemInAppStorage(key) {
    return await localStorage.getItem(key);
}