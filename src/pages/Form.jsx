import { useState } from "react";
import EventFrom from "../components/EventForm";
import UserCheckComponent from "../components/UserCheckFrom";
import { UserCard } from "../components/UserCard";
import { userLoader } from "../components/UserCheckFrom";

export default function Form() {
  const [showUserCheck, setShowUserCheck] = useState(true);
  const [showUserCard, setShowUserCard] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUsername] = useState("");
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
    console.log("Test userData function; " + name);
    const usersRes = await userLoader();
    console.log(usersRes);
    const user = usersRes.find((obj) => obj.name === name);
    console.log(user);

    setUserImage(user.image);
    setUserId(user.id);
  };

  const getInfo = (name) => {
    const realName = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(realName);
    setUsername(realName);
    getUserData(realName);
  };

  return (
    <div>
      {showUserCheck && (
        <UserCheckComponent handleAction={handleAction} getInfo={getInfo} />
      )}
      {showUserCard && (
        <div className="last-user-check">
          <UserCard userName={userName} userImage={userImage} />
          <button onClick={handleCreate}>Create event</button>
        </div>
      )}
      {showForm && <EventFrom userName={userName} userId={userId} />}
    </div>
  );
}
