import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  InputLabel,
  IconButton,
  InputAdornment,
  FormControl,
  Typography,
  Button,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { registerService } from "../services/RegisterService";

export default function RegisterForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showConfirmP, setShowConfirmP] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // const handleConfirmPassword = (event) => {
  //   setConfirmPassword(event.target.value);
  // };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleClickShowConfirmP= () => setShowConfirmP((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { success, error } = await registerService({
      firstname,
      lastname,
      email,
      password,
    });

    console.log("Register service response:", { success, error }); // Log the response from registerService

    if (success) {
      console.info("Bien inscrit");
      navigate("/");
    } else {
      setError(error);
      console.info("Pas inscrit");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", pt: "3rem" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ border: "2px black", height: "40rem", width: "25rem" }}
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
                pt: "3rem",
                gap: "2rem",
                width: "100%",
              }}
            >
              <Typography variant="h4">Inscription</Typography>
              <FormControl sx={{ width: "80%" }} onChange={handleFirstName}>
                <InputLabel>Prénom</InputLabel>
                <OutlinedInput
                  value={firstname}
                  label="Prénom"
                  sx={{ height: "3rem" }}
                />
              </FormControl>
              <FormControl sx={{ width: "80%" }}>
                <InputLabel>Nom</InputLabel>
                <OutlinedInput
                  value={lastname}
                  onChange={handleChangeLastName}
                  label="Nom"
                  sx={{ height: "3rem" }}
                />
              </FormControl>
              <FormControl sx={{ width: "80%" }}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  value={email}
                  onChange={handleMailChange}
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
              {/* <FormControl sx={{ width: "80%" }}>
                <InputLabel>Confirmer mot de passe</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmP ? "text" : "password"}
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmP}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirmer mot de passe"
                  sx={{ height: "3rem" }}
                />
              </FormControl> */}
            </Box>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <Typography sx={{ fontSize: "0.8rem", pt: "0.5rem" }}>
                Déjà inscrit? Connectez vous !
              </Typography>
            </Link>
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              sx={{ mt: "3rem", width: "80%" }}
              type="submit"
            >
              S&apos;inscrire
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
