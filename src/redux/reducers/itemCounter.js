// addItemsReducer.js

const initialState = {
  itemCount: 0,
};

const itemCounter = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEM_COUNT":
      return {
        // ...state,
        itemCount: action.payload,
      };

    default:
      return state;
  }
};

export default itemCounter;
