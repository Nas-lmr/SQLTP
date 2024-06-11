import { useContext } from "react";

import { userAuthContext } from "./userContex";

const UseAuthContext = () => {
  const contextAuth = useContext(userAuthContext);
  if (!contextAuth) {
    throw Error("AuthContext must be used inside an userProvider");
  }
  return contextAuth;
};
export default UseAuthContext;
