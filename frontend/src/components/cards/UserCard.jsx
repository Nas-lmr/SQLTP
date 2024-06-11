import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function UserCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
