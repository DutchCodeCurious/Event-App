import { useUserContext } from "../layouts/RootLayout";
import UserCheckComponent from "../components/UserCheckFrom";

export default function Login() {
  const handleUser = useUserContext();
  return (
    <div className="Login-form">
      <UserCheckComponent />
      <button onClick={handleUser}>Login</button>
    </div>
  );
}
