import React, { useReducer, useRef } from "react";
import { formReducer, INITIAL_STATE } from "./CopieFormReducer";

const Form = () => {
  //USING USEREDUCER

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const catRef = useRef();
  console.log(state);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleTags = () => {
    const cats = catRef.current.value.split(",");
    const addedCats = new Set(state.category);
    cats.forEach((cat) => {
      const trimmedCat = cat.trim().toLowerCase();
      const capitalizedCat =
        trimmedCat.charAt(0).toUpperCase() + trimmedCat.slice(1);
      if (!addedCats.has(capitalizedCat)) {
        addedCats.add(capitalizedCat);
        dispatch({ type: "ADD_TAG", payload: capitalizedCat });
      }
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Desc"
          onChange={handleChange}
          name="description"
        />
        <input
          type="text"
          placeholder="location"
          onChange={handleChange}
          name="location"
        />
        <input
          type="text"
          placeholder="image"
          onChange={handleChange}
          name="image"
        />

        <input type="datetime-local" onChange={handleChange} name="startTime" />
        <input type="datetime-local" onChange={handleChange} name="endTime" />
        <p>Categories:</p>
        <textarea
          ref={catRef}
          placeholder="Seperate categories with commas..."
        ></textarea>
        <button onClick={handleTags} type="button">
          Add Categories
        </button>
        <div className="tags">
          {/** 
          {state.categories.map((cat) => (
            <small
              onClick={() => dispatch({ type: "REMOVE_TAG", payload: cat })}
              key={cat}
            >
              {cat}
            </small>
          ))}
          */}
        </div>
      </form>
    </div>
  );
};

export default Form;
