import { useState } from "react";
import EventFrom from "../components/EventForm";
import UserCheckComponent from "../components/UserCheckFrom";

export default function Form() {
  const [showUserCheck, setShowUserCheck] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleAction = () => {
    setShowForm(true);
    setShowUserCheck(false);
  };

  return (
    <div>
      {showUserCheck && <UserCheckComponent handleAction={handleAction} />}
      {showForm && <EventFrom />}
    </div>
  );
}
