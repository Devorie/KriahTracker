import StudentView from "../components/StudentsView";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, Card, CardContent, CardActions, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentsByTutor = ( initialTutor ) => {
    const [currentTutor, setCurrentTutor] = useState(initialTutor);
    const [tutors, setTutors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTutors = async () => {
            const { data } = await axios.get('/api/kriahtracker/getTutors');
            setTutors(data);
        }
        loadTutors();
    }, []);

    const handleSelectTutor = (tutor) => {
        setCurrentTutor(tutor);
    };

    const handleManageTutors = () => {
        navigate('/managetutors');
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            {currentTutor ? (
                // Displaying the selected tutor's view
                <Card sx={{ padding: 2 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Currently Viewing: {currentTutor.name}
                        </Typography>
                        {/* Render student view for the current tutor */}
                        <StudentView tutorId={currentTutor.id} />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => setCurrentTutor(null)}>
                            Back to Tutor List
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                // Displaying the list of tutors or a message if none are available
                    <Box sx={{ margin: 20, padding: 2 }}>
                    <Typography variant="h3" align="center" gutterBottom>
                        Select a Tutor
                    </Typography>
                    {tutors.length > 0 ? (
                        <List>
                            {tutors.map((tutor) => (
                                <ListItem key={tutor.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Card sx={{ width: '100%', maxWidth: 500, margin: 2, padding: 2 }}>
                                        <CardContent>
                                            <Typography variant="h5">{tutor.name}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleSelectTutor(tutor)}
                                                fullWidth
                                            >
                                                Select
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Box textAlign="center" sx={{ mt: 4 }}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                No tutors are currently entered in the system.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleManageTutors}
                            >
                                Go to Manage Tutors
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Container>
    );
};

export default StudentsByTutor;