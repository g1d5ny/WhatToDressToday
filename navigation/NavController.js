import React, { useContext } from "react";
import StackNavigation from "./stack/StackNavigation";
import { AuthContext } from "../context/AuthContext";
import AuthStackNavigation from "./stack/AuthStackNavigation";

export default () => {
  const {isLoggedIn} = useContext(AuthContext);

  // if (!isLoggedIn) return <AuthStackNavigation/>
  return <StackNavigation />
}
