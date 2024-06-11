import { useState, useEffect } from "react";
import { fetchUsersService } from "../../services/UserService";
import { Grid, Container, Alert } from "@mui/material";
import UserCard from "./UserCard";

export default function UsersComponent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const result = await fetchUsersService();
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    };

    getUsers();
  }, []);

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
