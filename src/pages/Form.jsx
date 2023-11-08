import { useState } from "react";
import EventFrom from "../components/EventForm";
import UserCheckComponent from "../components/UserCheckFrom";
import { UserCard } from "../components/UserCard";
import { userLoader } from "../components/UserCheckFrom";

export default function Form() {
  const [showUserCheck, setShowUserCheck] = useState(true);
  const [showUserCard, setShowUserCard] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userId, setUserId] = useState("");
  const handleAction = () => {
    setShowUserCard(true);
    setShowUserCheck(false);
  };

  const handleCreate = () => {
    setShowUserCard(false);
    setShowForm(true);
  };
  const getUserData = async (name) => {
    const users = await userLoader();
    const user = users.find((obj) => obj.name === name);
    setUserImage(user.image);
    setUserId(user.id);
    console.log(userId);
  };

  const getInfo = (name) => {
    setUsername(name);
    getUserData(name);
  };

  return (
    <div>
      {showUserCheck && (
        <UserCheckComponent handleAction={handleAction} getInfo={getInfo} />
      )}
      {showUserCard && (
        <div className="last-user-check">
          <UserCard userName={username} userImage={userImage} />
          <button onClick={handleCreate}>Create event</button>
        </div>
      )}
      {showForm && <EventFrom username={username} />}
    </div>
  );
}
