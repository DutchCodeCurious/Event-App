import { NavLink, Outlet } from "react-router-dom";
import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function RootLayout() {
  const [user, setUser] = useState(false);

  const handleUser = () => {
    console.log("handleUser");
    setUser(true);
  };

  return (
    <div className="root-layout">
      <header>
        <NavLink to="/" className="title">
          <h1>WincEvents</h1>
        </NavLink>
        <nav>
          <NavLink className="buttons-head" to="/">
            Home
          </NavLink>
          <NavLink className="buttons-head" to="events">
            Events
          </NavLink>
          {user ? (
            <NavLink className="buttons-head" to="user">
              User
            </NavLink>
          ) : (
            <NavLink className="buttons-head" to="login">
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <main>
        <UserContext.Provider value={handleUser}>
          <Outlet />
        </UserContext.Provider>
      </main>
    </div>
  );
}
