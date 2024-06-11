import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const userContext = createContext();

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useLocalStorage("user", null);

  const login = (userInfo) => {
    setUserData(userInfo);
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          method: "POST", // Change to "POST" if needed
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        localStorage.clear();
        setUserData(null);
      } else {
        console.error("Failed to logout. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred during logout:", err);
    }
  };

  const contextValue = useMemo(() => {
    return { userData, setUserData, login, logout };
  }, [userData]);

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

export const useUserContext = () => useContext(userContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
