import axios from "axios";
import { createContext, useState } from "react";

// Create and export your context
const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async () => {
    const tokenInStorage = localStorage.getItem("authToken");

    if (tokenInStorage) {
      try {
        const response = await axios.get("http://localhost:5005/auth/verify", {
          headers: { authorization: `Bearer ${tokenInStorage}` },
        });
        console.log("from context, here is the verify response", response.data);
        setUser(response.data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("Error on authenticateUser function: ", error);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        greet: "Hello",
        authenticateUser,
        isLoading,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextWrapper, AuthContext };

// Create your provider component that will keep your state
