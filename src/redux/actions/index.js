export const addItem = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const delItem = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};
export const loginSuccess = (token, userId) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      token,
      userId,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

// actions.js

const setItemCount = (count) => {
  return {
    type: "SET_ITEM_COUNT",
    payload: count,
  };
};

export { setItemCount };
