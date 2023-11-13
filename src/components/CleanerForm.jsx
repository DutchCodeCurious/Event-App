import { useReducer, useRef } from "react";
import { formReducer, INITIAL_STATE } from "../components/formReducer";
{
  /** 
export const CleanerForm = () => {
  const [answers, setAnswers] = useState([]);

  const handleCatInputChange = (event) => {
    setAnswers(event.target.value.split(","));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(answers);
    // Do something with the answers array
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Answers:
        <input
          type="text"
          value={answers.join(",")}
          onChange={handleCatInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
*/
}

export const CleanerForm = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef();

  console.log(state);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_EVENTS",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleCats = (e) => {
    const tags = e.target.value.split(",");
    tags.forEach((tag) => {
      dispatch({ type: "UPDATE_CATEGORIES", payload: tag });
    });
  };

  return (
    <form className="event-form">
      {/** 
      <label>Username:</label>
      <input
        placeholder={userName}
        type="text"
        required
        name="name"
        value={name}
        onChange={handleChange}
        readOnly
      />
      */}
      <label>Event name:</label>
      <input
        placeholder="Event name"
        type="text"
        required
        name="title"
        onChange={handleChange}
      />
      <label>description:</label>
      <textarea
        placeholder="Jump around in a castle..."
        required
        name="description"
        onChange={handleChange}
      />
      <label>Image (optional)</label>
      <input type="url" name="image" onChange={handleChange} />
      Category
      <textarea
        ref={tagRef}
        required
        placeholder="Separate categories with a comma"
        onChange={handleCats}
      />
      <label>Location</label>
      <input type="text" required name="location" onChange={handleChange} />
      <label>Begin time event</label>
      <input
        type="datetime-local"
        required
        name="startTime"
        onChange={handleChange}
      />
      <label>End time event</label>
      <input
        type="datetime-local"
        required
        name="endtime"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
