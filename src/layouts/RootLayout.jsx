import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <NavLink to="/" className="title">
            <h1>WincEvents</h1>
          </NavLink>

          <NavLink className="buttons-head" to="/">
            Home
          </NavLink>
          <NavLink className="buttons-head" to="events">
            Events
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
