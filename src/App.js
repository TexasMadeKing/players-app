import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material'; // Added the missing components
import PlayerList from './components/PlayerList';
import PlayerDetails from './components/PlayerDetails';

const API_URL = 'http://localhost:5000'; // Flask app runs on port 5000 by default

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.data.message === 'Logged in successfully.') {
        setIsLoggedIn(true);
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      alert('Login error.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center">
        Player App
      </Typography>
      {!isLoggedIn ? (
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      ) : (
        <>
          <Typography variant="h6" align="center">
            You are logged in. Add more functionalities here.
          </Typography>
          <div>
            <Typography variant="h6" align="center">
              Player List
            </Typography>
            <PlayerList selectPlayer={(id) => setSelectedPlayerId(id)} />
            {selectedPlayerId && <PlayerDetails playerId={selectedPlayerId} refresh={() => setSelectedPlayerId(null)} />}
          </div>
        </>
      )}
    </Container>
  );
}

export default App;
