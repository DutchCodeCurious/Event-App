import React, { useState } from "react";
import manLogo from "./images/1.png";

{
  /** 
if (!userExists) {
  fetch(`http://localhost:8000/users`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(users),
  });
  console.log("User is made");
}
*/
}

const UserCheckComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [userData, setUserDate] = useState("");
  const users = userLoader();

  const woman = "https://picsum.photos/id/64/200/300";
  const man1 = "https://picsum.photos/id/91/200/300";

  const handleExistingUser = async (full) => {
    setIsMatch(true);
    console.log(`${full} is found in the database`);
  };

  const findUserIdByName = (name, db) => {
    const user = db.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    return user ? user.id : null;
  };
  const handleUserImageChange = (e) => {
    setUserImage(e.target.value);
    console.log("H" + userImage);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const full = await (firstName + " " + lastName);
    setFullname(`${firstName} ${lastName}`);
    const userNames = await users;
    const names = userNames.map((item) => item.name.toLowerCase());
    if (names.some((item) => item === fullName.toLowerCase())) {
      const userId = findUserIdByName(full, userNames);
      console.log(`${full} is found in the database answer is: ${userId}`);
    } else {
      setIsMatch(false);
      console.log(`${full} is a new user`);
    }
  };

  return (
    <>
      {isMatch ? (
        <>
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
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
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
          <input
            type="file"
            accept="image/*"
            onChange={handleUserImageChange}
          />
          <br />
          {/** 
          <label>
            Use Default Image:
            <br />
            <input
              type="image"
              name="Default man"
              value={man}
              src={man}
              onClick={handleUserImageChange}
            />
            <input
              type="image"
              name="Default woman"
              value={woman}
              src={woman}
              onClick={handleUserImageChange}
            />
          </label>
          */}
          <br />
          <button type="submit" onChange={() => setIsMatch(!isMatch)}>
            Submit
          </button>
          <img src={manLogo} />
        </form>
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
