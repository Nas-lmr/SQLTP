import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export const userAuthContext = createContext();

// Reducer function to handle login and logout actions
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { authUser: action.payload };
    case "LOGOUT":
      return { authUser: null };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, { authUser: null });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        const user = { ...decodedToken, token };

        dispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <userAuthContext.Provider value={contextValue}>
      {children}
    </userAuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
