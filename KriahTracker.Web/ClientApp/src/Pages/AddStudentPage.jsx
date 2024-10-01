import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const AddStudentPage = () => {
    const navigate = useNavigate();
    const [birthDay, setBirthDay] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [className, setClassName] = useState('');

    //const onAddClick = async () => {
    //    const birthDate = new Date(birthDay); // Ensure it's a valid Date object
    //    await axios.post(`/api/kriahtracker/addStudent`, { firstName, lastName, birthDay: birthDate, class: className });
    //    navigate('/');
    //}

    const onAddClick = async () => {
        try {
            const birthDate = new Date(birthDay);
            await axios.post(`/api/kriahtracker/addStudent`, { firstName, lastName, birthDay: birthDate, class: className });
            navigate('/');
        } catch (error) {
            console.error("Error adding student:", error.response ? error.response.data : error.message);
        }
    }



    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Student
            </Typography>
            <TextField
                label="FirstName"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                onChange={e => setFirstName(e.target.value)}
                value={firstName }
            />
            <TextField
                label="LastName"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
            />
            <TextField
                label="Class"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                onChange={e => setClassName(e.target.value)}
                value={className}
            />
             <TextField
                label="Birth Day"
                type="date"
                value={dayjs(birthDay).format("YYYY-MM-DD")}
                onChange={e => setBirthDay(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button onClick={onAddClick} variant="contained" color="primary">Add Student</Button>
        </Container>
    );
}

export default AddStudentPage;
