import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography, Stack ,Container } from "@mui/material";
import Events from '../components/Events';
import { EventProvider } from "../context/EventContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
        <EventProvider>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                }}
            >
                <Container>
                    <Typography>
                        Dashboard
                    </Typography>
                    {user ? (
                    <Stack>
                    <Typography>Welcome, {user.name}</Typography>
                    <Link to={`/users`}>
                        <button>User Management</button>
                    </Link>
                    <Button onClick={handleLogout}>Logout</Button>
                    {/* <EventProvider> */}
                        <Events user={user} />
                    {/* </EventProvider> */}
                    </Stack>
                ) : (
                    <Typography>No user logged in</Typography>
                )}
                </Container>

            </Box>
        </EventProvider>
    </>
  );
}

export default Dashboard;