import React, { useReducer, useRef, useEffect } from "react";
import { updateCategories, getCategoryId } from "../functions/checkData";
import { formReducer, INITIAL_STATE } from "./CopieFormReducer";

const FormCopie = ({ userName, userId }) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const catRef = useRef();
  console.log(state);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_EVENTS",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const handleCats = async () => {
    const cats = catRef.current.value.split(",");
    const addedCats = new Set(state.category);
    const newCats = [];
    cats.forEach((cat) => {
      const trimmedCat = cat.trim().toLowerCase();
      if (trimmedCat !== "") {
        if (!addedCats.has(trimmedCat)) {
          addedCats.add(trimmedCat);
          newCats.push({ name: trimmedCat });
        }
      }
    });
    if (newCats.length > 0) {
      dispatch({
        type: "UPDATE_CATEGORIES",
        payload: newCats,
      });
    }
  };

  useEffect(() => {
    const updateAllCategories = async () => {
      for (const cat of state.categories) {
        console.log(cat.name.name);
        await updateCategories(cat.name.name);
        const id = await getCategoryId(cat.name.name);
        if (!state.events.categoryIds.includes(id)) {
          state.events.categoryIds.push(id);
        }
      }
    };

    updateAllCategories();
  }, [state.categories]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_EVENTS",
      payload: { createdById: userId },
    });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/events`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(state.events),
    });
  };
  return (
    <div>
      <form className="form_">
        <label>
          Username:
          <input
            type="text"
            required
            name="createdById"
            value={userName}
            onChange={handleChange}
            readOnly
          />
        </label>
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
        <button onClick={handleCats} type="button">
          Add Categories
        </button>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormCopie;
