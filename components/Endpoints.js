import React from "react";
import API from "../constants/Config";
import SessionService from "../services/SessionService";

const commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const getAuthHeaders = () => {
  return {
    Authorization: SessionService.authToken,
    ...commonHeaders
  };
};

// const userToken = await AsyncStorage.getItem("authToken");

export const API_Login = async (email, password) => {
  try {
    let response = await fetch(API.apiBase + "/customers/authenticate", {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({
        emailAddress: email,
        password: password
      })
    });

    let responseJson = await response.json();

    console.log("Login call complete: ", responseJson);

    if (response.status && response.status >= 200 && response.status < 300) {
      console.log("Proceeding for session creation");
      await SessionService.create(responseJson);
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const API_Signup = async (displayName, email, password) => {
  try {
    let response = await fetch(API.apiBase + "/customers", {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({
        displayName: displayName,
        emailAddress: email,
        password: password,
        tosAcceptance: true,
        acceptedTOSVersion: 1.0
      })
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      await SessionService.create(responseJson);
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const API_GetCustomer = async (userId, authToken) => {
  const path = API.apiBase + "/customers/" + userId;
  console.log("path", path);

  try {
    let response = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
        ...commonHeaders
      }
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (get rewards): ", error);
    return Promise.reject(error);
  }
};

export const API_GetRewards = async queryParams => {
  const path = API.apiBase + "/rewards?" + serializeQuery(queryParams);

  try {
    let response = await fetch(path, {
      method: "GET",
      headers: getAuthHeaders()
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (get rewards): ", error);
    return Promise.reject(error);
  }
};

export const API_GetPoints = async queryParams => {
  const path =
    API.apiBase + "/points?expand=store&" + serializeQuery(queryParams);

  try {
    let response = await fetch(path, {
      method: "GET",
      headers: getAuthHeaders()
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (get points): ", error);
    return Promise.reject(error);
  }
};

export const API_GetTransactions = async queryParams => {
  const path =
    API.apiBase + "/loyalties?expand=true&" + serializeQuery(queryParams);

  try {
    let response = await fetch(path, {
      method: "GET",
      headers: getAuthHeaders()
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (get transactions): ", error);
    return Promise.reject(error);
  }
};

export const API_CreateTransaction = async reward => {
  const path = API.apiBase + "/loyalties";
  console.log("Redeeming", reward);
  try {
    let response = await fetch(path, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ rewardId: reward.id + "" })
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (get transactions): ", error);
    return Promise.reject(error);
  }
};

export const API_UpdateProfile = async (userId, postData) => {
  let path = API.apiBase + "/customers/" + userId;

  try {
    let response = await fetch(path, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(postData)
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (update profile): ", error);
    return Promise.reject(error);
  }
};

export const API_CreateAsset = async (type = "jpeg") => {
  const path = API.apiBase + "/assets";
  let mime = "image/";

  if (type === "png") {
    mime += "png";
  } else if (type === "jpeg" || type === "jpg") {
    mime += "jpeg";
  }

  try {
    let response = await fetch(path, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        mime: mime,
        fileType: "avatar"
      })
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (create asset): ", error);
    return Promise.reject(error);
  }
};

export const API_UploadAsset = async (assetUrl, data) => {
  try {
    let response = await fetch(assetUrl, {
      method: "PUT",
      body: data
    });

    console.log("Upload Ep: ", response);

    let responseJson;
    try {
      responseJson = await response.json();
    } catch (e) {
      responseJson = response;
      console.log("Could not read JSON");
    }

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (put asset): ", error);
    return Promise.reject(error);
  }
};

export const API_UpdateAsset = async id => {
  let path = API.apiBase + "/assets/" + id;

  try {
    let response = await fetch(path, {
      method: "PUT",
      headers: getAuthHeaders()
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (update asset): ", error);
    return Promise.reject(error);
  }
};

export const API_DeleteAccount = async () => {
  const user = SessionService.user;
  let path = API.apiBase + "/customers/" + user.id;

  try {
    let response = await fetch(path, {
      method: "DELETE",
      headers: getAuthHeaders()
    });

    let responseJson = await response.json();

    if (response.status && response.status >= 200 && response.status < 300) {
      return Promise.resolve(responseJson);
    }

    return Promise.reject(responseJson || response);
  } catch (error) {
    console.log("Endpoint.js error (delete account): ", error);
    return Promise.reject(error);
  }
};

const serializeQuery = queryObject => {
  var paramArray = [],
    queryString = "";

  for (var p in queryObject) {
    if (queryObject.hasOwnProperty(p)) {
      paramArray.push(
        encodeURIComponent(p) + "=" + encodeURIComponent(queryObject[p])
      );
    }
  }

  queryString = paramArray.join("&");

  return queryString;
};
