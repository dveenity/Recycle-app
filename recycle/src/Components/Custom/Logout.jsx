import { useLogout } from "../Hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();

  const logOut = () => {
    logout();
    window.location.reload(); // Reload the page
  };

  return (
    <button className="log-out" onClick={logOut}>
      Log Out
    </button>
  );
};

export default Logout;
