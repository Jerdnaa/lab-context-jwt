import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <h1>Profile Page</h1>
      <button type="button" onClick={logoutHandle}>
        Logout
      </button>
    </>
  );
};

export default ProfilePage;
