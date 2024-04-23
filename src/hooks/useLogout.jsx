import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const Logout = () => {
    setAuth({});
    navigate("/login");
  };
  return Logout;
};

export { useLogout };
