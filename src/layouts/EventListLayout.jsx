import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function EventListLayout() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="Event-List-Layout">
      <div className="head-bar">
        <h2>Events</h2>
        <NavLink to="user">Add event</NavLink>
      </div>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const eventsLoader = async () => {
  const res = await fetch(`http://localhost:8000/events`);

  if (!res.ok) {
    throw Error("Could not fetch the list of events");
  }

  return res.json();
};
