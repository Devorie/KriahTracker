import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, TextareaAutosize } from '@mui/material';
import axios from 'axios';

const AddMark = ({ term, studentId }) => {
    const navigate = useNavigate(); // Initialize navigate
    const [accuracy, setAccuracy] = useState('');
    const [fluency, setFluency] = useState('');
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState('');

    // Function to handle the Add button click
    const onAddClick = async () => {
        await axios.post(`/api/kriahtracker/addMark`, { studentId, term, accuracy, fluency, notes, action });
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                label="Accuracy"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={e => setAccuracy(e.target.value)}
                value={accuracy}
            />
            <TextField
                label="Fluency"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={e => setFluency(e.target.value)}
                value={fluency}
            />
            <TextField
                label="Action"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={e => setAction(e.target.value)}
                value={action}
            />
            <TextareaAutosize
                minRows={4}
                style={{ width: '100%', marginTop: '17px' }}
                margin="normal"
                onChange={e => setNotes(e.target.value)}
                value={notes}
                placeholder="Notes"
            />
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                <Button onClick={onAddClick} variant="outlined" color="secondary">Add Mark</Button>
            </div>
        </Container>
    );
}

export default AddMark;
