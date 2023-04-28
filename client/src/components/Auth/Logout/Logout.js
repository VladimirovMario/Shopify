import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function Logout() {
  const { onLogout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate("/");
  }, [onLogout, navigate]);

  return null;
}
