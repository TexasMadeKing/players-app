// src/components/PlayerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

const API_URL = 'http://localhost:5000';

function PlayerList({ selectPlayer }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get(`${API_URL}/players`);
      setPlayers(response.data);
    };
    fetchPlayers();
  }, []);

  return (
    <List component="nav">
      {players.map((player) => (
        <React.Fragment key={player.id}>
          <ListItem button onClick={() => selectPlayer(player.id)}>
            <ListItemText primary={player.username} secondary={`Score: ${player.score}`} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default PlayerList;
