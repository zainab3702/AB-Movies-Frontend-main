import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// simple hook to follow dry principles by avoiding to import useContext and AuthContext in every component
const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
