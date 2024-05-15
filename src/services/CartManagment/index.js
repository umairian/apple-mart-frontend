import { axiosInstanceCartManagement } from "../../utils/axios";

export const requestHandler = async ({ method, url, token, data }) => {
  console.log("header:", { method, url, token, data });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const requestOptions = {
    method,
    url,
    ...(method !== "get" && { data }),
    ...config,
  };

  try {
    const response = await axiosInstanceCartManagement(requestOptions);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    let errorMessage = "Something went wrong";
    if (error.response) {
      errorMessage = error.response.data;
    } else if (error.request) {
      errorMessage = "No response received";
    } else {
      errorMessage = error.message || "Error setting up the request";
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const addToCart = (token, userId, data) => {
  return requestHandler({
    method: "POST",
    url: `users/${userId}/cart/add`,
    token,
    data,
  });
};

export const getCartItemsCount = (token, userId) => {
  return requestHandler({
    method: "GET",
    url: `users/${userId}/cart/countCartItems`,
    token,
  });
};
export const getCartItems = (token, userId) => {
  return requestHandler({
    method: "GET",
    url: `users/${userId}/cart/getCartItems`,
    token,
  });
};
export const removeCartItem = (token, userId, data) => {
  return requestHandler({
    method: "DELETE",
    url: `users/${userId}/cart/removeCartItem`,
    token,
    data,
  });
};
