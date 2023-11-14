export const INITIAL_STATE = {
  events: {
    createdBy: "",
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
    case "UPDATE_EVENTS":
      return {
        ...state,
        events: {
          ...state.events,
          ...action.payload,
        },
      };
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: Array.isArray(action.payload)
          ? action.payload.map((cat) => ({ name: cat }))
          : [],
      };

    default:
      return state;
  }
};
