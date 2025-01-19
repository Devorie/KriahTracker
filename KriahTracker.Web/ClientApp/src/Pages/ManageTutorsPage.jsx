import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import StudentView from '../components/StudentsView';

const ManageTutorsPage = () => {
    useEffect(() => {
        const loadTutors = async () => {
            const { data } = await axios.get('/api/kriahtracker/getTutors');
            setTutors(data);
        }
        loadTutors();
    }, []);
    const [tutors, setTutors] = useState([]);
  const [open, setOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState('');
    const [editingTutor, setEditingTutor] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toRemove, setToRemove] = useState('');

  const handleOpen = (tutor = '') => {
    setOpen(true);
      setSelectedTutor(tutor);
      setEditingTutor(tutor);
  };

  const handleClose = () => {
    setOpen(false);
      setSelectedTutor('');
      setEditingTutor(null);
  };

  const handleAddEdit = () => {
      if (editingTutor) {
          console.log(editingTutor, selectedTutor)
          axios.post(`/api/kriahtracker/updateTutor`, { EditedTutor: editingTutor, Id: selectedTutor.Id });
          setTutors(tutors.map(tutor => tutor === editingTutor ? selectedTutor : tutor));
    } else {
          axios.post(`/api/kriahtracker/addTutor?tutorName=${selectedTutor}`)
          setTutors([...tutors, selectedTutor]);
    }
    handleClose();
  };

    const handleRemove = (tutor) => {
        console.log(tutor);
        setToRemove(tutor);
        setSelectedTutor(tutor);
    setConfirmOpen(true);
  };

    const handleConfirmClose = (d) => {
        if (d) {
            console.log(toRemove);
            axios.post(`/api/kriahtracker/removeTutor?id=${toRemove.Id}`);
            setTutors(tutors.filter(s => s !== toRemove));
            setToRemove('');
            setConfirmOpen(false);

        } else {
            setToRemove('');
        setConfirmOpen(false);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ marginTop: '30px', minWidth: '200px'}}>
          Add Tutor
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Tutor</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tutors.map((tutor) => (
              <TableRow key={tutor}>
                <TableCell sx={{ fontSize: '18px' }}>{tutor}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(tutor)}>Edit</Button>
                        <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleRemove(tutor)}>Remove</Button>
                        <Button color="turquoise" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => window.location.href = `/studentsbytutor?initialTutor=${tutor}`}>View Students</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
              <DialogTitle>{editingTutor ? 'Edit Tutor' : 'Add Tutor'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Tutor" type="text" fullWidth value={selectedTutor} onChange={(e) => setSelectedTutor(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingTutor ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
          <DialogTitle>Confirm Remove</DialogTitle>
          <DialogContent>
                  Are you sure you want to remove {selectedTutor}?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmClose(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleConfirmClose(true)} color="secondary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}

export default ManageTutorsPage;
