import React from "react";
import LogoutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

function Logout(props) {
  const { setAuth, setAuthStorage } = useAuth();
  const handleLogout = () => {
    setAuth({});
    setAuthStorage("");
  };
  return (
    <div>
      <img
        src={LogoutIcon}
        alt="logout"
        className="hover:cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Logout;
