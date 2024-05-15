import { axiosInstanceUserManagement } from "../../utils/axios";

export const signUpUser = async (user) => {
  try {
    let result = await axiosInstanceUserManagement.post(`users/signUp`, {
      email: user.email,
      name: user.username,
      password: user.password,
    });
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
    console.error(exception);
    return {
      success: false,
      message: exception.message,
    };
  }
};

export const loginUser = async (user) => {
  try {
    let result = await axiosInstanceUserManagement.post(`users/login`, {
      email: user.email,
      password: user.password,
    });
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
    console.error(exception);
    return {
      success: false,
      message: exception.message,
    };
  }
};

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
    const response = await axiosInstanceUserManagement(requestOptions);
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
