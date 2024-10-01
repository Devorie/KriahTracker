import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to the Kriah Tracker
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                overflow: 'hidden',
                margin: '20px 0'
            }}>
                <Button variant="contained" color="primary" component={Link} to="/viewstudenthistory" sx={{ margin: '0 10px' }}>
                    Students History
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/studentmarking" sx={{ margin: '0 10px' }}>
                    Add Marks
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/upload" sx={{ margin: '0 10px' }}>
                    Upload Students
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/addstudent" sx={{ margin: '0 10px' }}>
                    Add Student Manually
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/updateyear" sx={{ margin: '0 10px' }}>
                    Update Year
                </Button>
            </Box>
        </Container>
    );
}

export default HomePage;
