import { NavLink, Outlet } from "react-router-dom";

export default function FormLayout() {
  return (
    <div className="form-layout">
      <div className="form-headbar">
        <h2>Create new event</h2>
        <NavLink to="/events/">Back</NavLink>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
