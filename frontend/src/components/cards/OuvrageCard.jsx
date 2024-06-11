import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardMedia } from "@mui/material";

export default function OuvrageCard({ title, language }) {
  return (
    <Card sx={{ width: "20rem", height: "30rem" }}>
      <CardActionArea sx={{height:"100%"}}>
        <CardContent sx={{height:"100%"}}>
          <Box sx={{display:"flex", justifyContent:"center"}}>
            <CardMedia
              component="img"
              src="../../src/assets/images/Le-Prince.jpg"
              alt="Le Prince"
              sx={{ width: "70%" }}
            />
          </Box>
          <Typography  variant="h5" component="div" sx={{paddingTop:"1rem", fontSize:"1.2rem"}}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {language}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

OuvrageCard.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
