export const INITIAL_STATE = {
  createdById: "",
  title: "",
  description: "",
  image: "",
  categoryIds: [],
  location: "",
  startTime: "",
  endTime: "",
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        categoryIds: [...state.categoryIds, action.payload.value],
      };
  }
};
