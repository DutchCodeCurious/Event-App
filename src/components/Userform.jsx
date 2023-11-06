import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { checkUserExists } from "../functions/checkData";

{
  /** 
const checkNameExists = (userName, users) => {
  const lowercaseName = userName.toLowerCase();
  const checknames = users.map((item) => item.name.toLowerCase());
  console.log(lowercaseName);
  console.log(checknames);
  return checknames.some((item) => item === lowercaseName);
};

const checknames = userList.map((item) => item.name.toLowerCase());

const nameExists = checknames.some((item) => item === userName.toLowerCase);

*/
}

export default function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const users = userLoader();
  console.log(users[0].name);

  const handleOnSubmit = async (firstName, lastName, userList) => {
    setUserName(`${firstName} ${lastName}`);

    console.log(nameExists);

    console.log("submitted");
  };

  return (
    <>
      <h2>What is your name?</h2>
      <form className="user-check" onSubmit={handleOnSubmit}>
        <label>
          First name:{" "}
          <input
            name="firstName"
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last name:{" "}
          <input
            name="lastName"
            value={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button type="submit">Drukken</button>
      </form>
    </>
  );
}

export const userLoader = async () => {
  const userRes = await fetch(`http://localhost:8000/users`);

  if (!userRes.ok) {
    throw new Error(`HTTP error! status: ${userRes.status}`);
  }

  return userRes.json();
};
