import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const UpdateYear = () => {
    const navigate = useNavigate();
    const [currentYear, setCurrentYear] = useState('');
    const [yearName, setYearName] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCurrentYear = async () => {
            setLoading(true);
            const { data } = await axios.get('/api/kriahtracker/getYear');
            setCurrentYear(data);
            setLoading(false);
        };
        loadCurrentYear();
    }, []);

    const onConfirmUpdateClick = async () => {
        await axios.post(`/api/kriahtracker/updateYear?yearName=${yearName}`);
        navigate('/editclass');
    }

    return (
        <div style={{ width: '100%' }}>
            {loading ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                    <CircularProgress />
                    <Typography variant="h4" className="loading-text" sx={{ mt: 2 }}>
                        Kriah Solutions
                    </Typography>
                </Box>
            ) : (
                <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        The Current Year is {currentYear}
                    </Typography>
                    <TextField
                        label="New Year Name"
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                        fullWidth
                        margin="normal"
                        onChange={e => setYearName(e.target.value)}
                        value={yearName}
                    />
                    <Button onClick={() => setOpen(true)} variant="contained" color="primary">Update Year</Button>

                    <Dialog open={open} onClose={onConfirmUpdateClick} fullWidth maxWidth="sm">
                        <DialogTitle>Confirm Update</DialogTitle>
                        <DialogContent>
                            Are you sure you want to update the year to {yearName} and update all the student's classes?
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={() => navigate('/')} color="warning">
                                Cancel
                            </Button>
                                <Button onClick={() => setOpen(false)} color="primary">
                                Edit Name
                            </Button>
                            <Button onClick={() => onConfirmUpdateClick()} color="secondary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>)}
        </div>
    );
}

export default UpdateYear;