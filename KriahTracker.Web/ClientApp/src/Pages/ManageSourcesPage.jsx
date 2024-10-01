import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const ManageSourcesPage = () => {
    useEffect(() => {
        const loadSources = async () => {
            const { data } = await axios.get('/api/maser/GetStringSources');
            setSources(data);
        }
        loadSources();
    }, []);
  const [sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState('');
  const [editingSource, setEditingSource] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toDelete, setToDelete] = useState('');

  const handleOpen = (source = '') => {
    setOpen(true);
    setSelectedSource(source);
    setEditingSource(source);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSource('');
    setEditingSource(null);
  };

  const handleAddEdit = () => {
      if (editingSource) {
          console.log(editingSource, selectedSource)
          axios.post(`/api/maser/UpdateSource`, { editingSource, selectedSource });
      setSources(sources.map(source => source === editingSource ? selectedSource : source));
    } else {
          axios.post(`/api/maser/AddSource?source=${selectedSource}`)
      setSources([...sources, selectedSource]);
    }
    handleClose();
  };

    const handleDelete = (source) => {
        console.log(source);
        setToDelete(source);
    setConfirmOpen(true);
  };

    const handleConfirmClose = (d) => {
        if (d) {
            console.log(toDelete);
            axios.post(`/api/maser/DeleteSource?source=${toDelete}`);
            setSources(sources.filter(s => s !== toDelete));
            setToDelete('');
            setConfirmOpen(false);

        } else {
            setToDelete('');
        setConfirmOpen(false);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source}>
                <TableCell sx={{ fontSize: '18px' }}>{source}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                        <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingSource ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            This source has some income associated with it, are you sure you want to delete it?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmClose(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleConfirmClose(true)} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}

export default ManageSourcesPage;
