export default (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };

    case "DELETE_ROW":
      return {
        ...state,
        data: state.data.filter(
          (row) => row.treatmentNumber !== action.payload
        ),
      };

    case "ADD_SERVICE":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};
