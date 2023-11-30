import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children, authorized }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user || !authorized) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;