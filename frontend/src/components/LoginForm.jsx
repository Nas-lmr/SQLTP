import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { loginService } from "../services/LoginService";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { success, user, role, error } = await loginService(email, password);

    if (success) {
      // Inclure le rôle avec userData lors de la connexion
      login({ ...user, role });
      console.info("Connecté");

      if (role === "Admin") {
        navigate("/administration");
        console.info("Connecté en tant qu'admin");
      } else {
        navigate("/home");
        console.info("Connecté en tant qu'utilisateur");
      }
    } else {
      setError(error);
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", pt: "10rem" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ border: "2px black", height: "30rem", width: "25rem" }}
      >
        <Paper sx={{ width: "100%", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: "4rem",
                gap: "2rem",
                width: "100%",
              }}
            >
              <Typography variant="h4" sx={{ pt: "1rem" }}>
                Se connecter
              </Typography>
              <FormControl sx={{ width: "80%" }}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  onChange={handleMailChange}
                  value={email}
                  label="Email"
                  sx={{ height: "3rem" }}
                />
              </FormControl>
              <FormControl sx={{ width: "80%" }}>
                <InputLabel>Mot de passe</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  value={password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Mot de passe"
                  sx={{ height: "3rem" }}
                />
              </FormControl>
            </Box>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography sx={{ fontSize: "0.8rem", pt: "0.5rem" }}>
                Pas encore de compte? Inscrivez vous !
              </Typography>
            </Link>
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" sx={{ mt: "3rem" }} type="submit">
              Se connecter
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
