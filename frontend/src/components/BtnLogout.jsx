import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

export default function BtnLogout() {
  const { logout } = useUserContext();

  const navigate = useNavigate();
  const logoutFromSession = () => {
    logout();
    navigate("/");
    console.info("DISCONNECTED");
  };

  return (
    <Button variant="contained" onClick={logoutFromSession}>
      Déconnexion
    </Button>
  );
}
