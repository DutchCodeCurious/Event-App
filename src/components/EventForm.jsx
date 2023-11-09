import { useState } from "react";
import { checkCategoryExists, getCategoryId } from "../functions/checkData";

export default function EventFrom({ userName, userId }) {
  const [name, setName] = useState(userName);
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [image, setImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function updateCategoryId(categoryName) {
    setCategoryName(categoryName);
    const categorie = {
      name: categoryName,
    };

    const categoryExists = await checkCategoryExists(categoryName);
    if (!categoryExists) {
      fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(categorie),
      });
    }
    const categoryIds = await getCategoryId(categoryName);
    if (categoryIds !== undefined) {
      setCategoryId(categoryIds);
      console.log("state: " + categoryId);
      console.log("Category is made");
    } else {
      const categoryIds = await getCategoryId(categoryName);
      setCategoryId(categoryIds);
      console.log("state: " + categoryId);
    }
  }
  const handleImage = (e) => {
    setImage(e.target.value || "https://picsum.photos/seed/picsum/200/300");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const events = {
      createdBy: userId,
      title,
      description,
      image,
      categoryIds: categoryId,
      location,
      startTime,
      endTime,
    };
    {
      /** 
    const users = {
      name,
      image: "https://picsum.photos/id/237/200/300",
    };
*/
    }
    {
      /** 
    const userExists = await checkUserExists(name);
    if (!userExists) {
      fetch(`http://localhost:8000/users`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(users),
      });
      console.log("User is made");
    }

    fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(users),
    });

    fetch(`http://localhost:8000/categories`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(categorie),
    });
*/
    }
    fetch(`http://localhost:8000/events`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(events),
    });

    console.log(events);
  };

  return (
    <>
      <h2>Fill all the details of the new event :</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <label>Username:</label>
        <input
          placeholder={userName}
          type="text"
          required
          name="name"
          value={name}
          onChange={() => setName(userName)}
          readOnly
        />
        <label>Event name:</label>
        <input
          placeholder="Event name"
          type="text"
          required
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>description:</label>
        <textarea
          placeholder="Jump around in a castle..."
          required
          name="description"
          value={description}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <label>Image (optional)</label>
        <input type="url" name="image" value={image} onChange={handleImage} />
        Category
        <input
          type="text"
          name="categories"
          value={categoryName}
          onSubmit={(e) => updateCategoryId(e.target.value)}
        />
        <label>Location</label>
        <input
          type="text"
          required
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Begin time event</label>
        <input
          type="datetime-local"
          required
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label>End time event</label>
        <input
          type="datetime-local"
          required
          name="endtime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
