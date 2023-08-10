// src/components/PlayerDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';

const API_URL = 'http://localhost:5000';

function PlayerDetails({ playerId, refresh }) {
  const [player, setPlayer] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPlayer = async () => {
      const response = await axios.get(`${API_URL}/player/${playerId}`);
      setPlayer(response.data);
    };
    fetchPlayer();
  }, [playerId]);

  const handleEdit = async () => {
    if (editMode) {
      // Save changes
      const response = await axios.put(`${API_URL}/player/${player.id}`, player);
      if (response.data) {
        setPlayer(response.data);
        refresh();  // refresh player list
      }
    }
    setEditMode(!editMode);
  };

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/player/${player.id}`);
    refresh();  // refresh player list
  };

  if (!player) return null;

  return (
    <div>
      {editMode ? (
        <>
          <TextField
            label="Username"
            value={player.username}
            onChange={(e) => setPlayer({ ...player, username: e.target.value })}
          />
          <TextField
            label="Score"
            value={player.score}
            onChange={(e) => setPlayer({ ...player, score: e.target.value })}
          />
        </>
      ) : (
        <>
          <Typography variant="h6">{player.username}</Typography>
          <Typography>Score: {player.score}</Typography>
        </>
      )}
      <Button onClick={handleEdit}>
        {editMode ? 'Save' : 'Edit'}
      </Button>
      <Button color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default PlayerDetails;
