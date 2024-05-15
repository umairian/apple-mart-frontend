import { axiosInstanceProduct } from "../../utils/axios";

export const requestHandler = async ({ method, url, token, data }) => {
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
    const response = await axiosInstanceProduct(requestOptions);
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

export const getAllProducts = async () => {
  try {
    let result = await axiosInstanceProduct.get(`products`);

    if (!result) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

export const getSingleProduct = async (productId) => {
  try {
    let result = await axiosInstanceProduct.get(
      `products/product/${productId}`
    );
    if (!result) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};
