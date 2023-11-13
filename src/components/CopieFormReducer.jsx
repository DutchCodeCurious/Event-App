export const INITIAL_STATE = {
  events: {
    createdById: "",
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  },
  categories: {
    name: "",
  },
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_TAG":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "REMOVE_TAG":
      return {
        ...state,
        category: state.category.filter((cat) => cat !== action.payload),
      };

    default:
      return state;
  }
};
