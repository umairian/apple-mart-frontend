const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
