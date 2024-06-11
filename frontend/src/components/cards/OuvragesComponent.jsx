import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import OuvrageCard from "./OuvrageCard";
import { fetchOuvrages } from "../../services/OuvrageService";

export default function OuvragesComponent() {
  const [ouvrages, setOuvrages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOuvrages = async () => {
      const { success, ouvrages, error } = await fetchOuvrages();
      if (success) {
        setOuvrages(ouvrages);
      } else {
        setError(error);
      }
    };

    getOuvrages();
  }, []);

  return (
    <Container maxWidth="false"  sx={{ paddingTop: "5rem"}}>
      {error && (
        <Typography color="error" variant="h6" align="center">
          {typeof error === "string" ? error : "Une erreur est survenue"}
        </Typography>
      )}
      <Box
        component="section"
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
          gap: "4rem",
          justifyContent: "center",
        }}
      >
        {ouvrages.length > 0
          ? ouvrages.map((ouvrage) => (
              <OuvrageCard
                key={ouvrage.id}
                id={ouvrage.id}
                title={ouvrage.title}
                language={ouvrage.language}
              />
            ))
          : !error && (
              <Typography variant="h6" align="center">
                Aucun ouvrage disponible.
              </Typography>
            )}
      </Box>
    </Container>
  );
}
