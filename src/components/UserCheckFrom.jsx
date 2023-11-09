import React, { useState } from "react";
import manLogo from "../images/man.png";
import womanLogo from "../images/woman.png";

const UserCheckComponent = ({ handleAction, getInfo }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullname] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isMatch, setIsMatch] = useState(true);

  const handleDefaultImageSelection = async (event) => {
    const selectedImage = event.target.value;
    setImage(selectedImage);
  };

  const findUserIdByName = (name, db) => {
    const user = db.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    return user ? user.id : null;
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userNames = await userLoader();

    const fName = await firstName;
    const lName = await lastName;
    const full =
      fName.charAt(0).toUpperCase() +
      fName.slice(1) +
      " " +
      lName.charAt(0).toUpperCase() +
      lName.slice(1);

    setFullname(full);
    setName(fullName);

    console.log(full);
    const names = await userNames.map((item) => item.name.toLowerCase());
    console.log(names);

    const lowFullName = full.toLowerCase();
    console.log("Test " + lowFullName);

    if (names.some((item) => item === lowFullName)) {
      const userId = findUserIdByName(full, userNames);

      getInfo(full);
      handleAction();

      console.log(`${full} is found in the database answer is: ${userId}`);
    } else {
      setIsMatch(false);
      console.log(`${full} is a new user`);
    }
  };

  const handleSecondSubmit = async (e) => {
    e.preventDefault();

    const users = {
      name,
      image,
    };

    fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(users),
    });
    getInfo(name);
    handleAction();
    console.log("There is a new user made");
  };

  return (
    <>
      {isMatch ? (
        <div className="user-check-form">
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="user-check-form">
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </label>
            <br />
            <label>
              Choose Image:
              <br />
              <input
                className="default-image"
                type="image"
                name="Default man"
                value={manLogo}
                src={manLogo}
                onClick={handleDefaultImageSelection}
              />
              <input
                className="default-image"
                type="image"
                name="Default woman"
                value={womanLogo}
                src={womanLogo}
                onClick={handleDefaultImageSelection}
              />
            </label>

            <br />
            <button type="submit" onClick={handleSecondSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserCheckComponent;

export const userLoader = async () => {
  const userRes = await fetch(`http://localhost:8000/users`);

  if (!userRes.ok) {
    throw new Error(`HTTP error! status: ${userRes.status}`);
  }

  return userRes.json();
};
