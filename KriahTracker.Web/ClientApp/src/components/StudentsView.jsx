import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { IconButton, Button, CircularProgress, Typography, Container, TextField, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Table from './Table';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddMark from './AddMark';

const VISIBLE_FIELDS = ['detials', 'lastName', 'firstName', 'class'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StudentView = ({ marking }) => {
    const [open, setOpen] = useState(false);
    const [studentViewing, setStudentViewing] = useState('');
    const [term, setTerm] = useState(0);
    const [studentInfo, setStudentInfo] = useState([]);
    const [studentRows, setStudentRows] = useState([]);
    const [checkboxSelection, setCheckboxSelection] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [accuracy, setAccuracy] = useState('');
    const [fluency, setFluency] = useState('');
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState('');
    const [addedMarkIds1, setAddedMarkIds1] = useState([]);
    const [addedMarkIds2, setAddedMarkIds2] = useState([]);
    const [addedMarkIds3, setAddedMarkIds3] = useState([]);
   
    useEffect(() => {
        const loadStudents = async () => {
            setLoading(true); 
            try {
                const { data } = await axios.get('/api/kriahtracker/getStudents');
                setStudentRows(data);
            } finally {
                setLoading(false); 
            }
        };
        loadStudents();
    }, []);

    const handleRowClick = async (id) => {
        const selectedStudent = rows.find(r => r.id === id);
        if (selectedStudent) {
            setStudentViewing(selectedStudent);
            setStudentInfo(selectedStudent.infoByYear);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setStudentInfo([]);
        setStudentViewing('');
        setOpen(false);        
    };

    const onAddClick = async () => {
        await axios.post(`/api/kriahtracker/addMark`, { studentId: studentViewing.id, term, accuracy, fluency, notes, action });
        setOpen(false);
        if (term === 1) {
            setAddedMarkIds1([...addedMarkIds1, studentViewing.id]);
        } else if (term === 2) {
            setAddedMarkIds2([...addedMarkIds2, studentViewing.id]);
        } else if (term === 3) {
            setAddedMarkIds3([...addedMarkIds3, studentViewing.id]);
        }
    }

    const rows = studentRows;

    const allColumns = [
        {
            field: 'detials',
            headerName: '',
            width: 175,
            renderCell: (params) => {
                const info = params.row.infoByYear.find(s => s.yearId === params.row.currentYear.id);
                let hasDataForTerm = false;

                if (marking) {
                    if (term === 1) {
                        hasDataForTerm = info.accuracyTermOne !== null || addedMarkIds1.includes(info.studentId);
                    } else if (term === 2) {
                        hasDataForTerm = info.accuracyTermTwo !== null || addedMarkIds2.includes(info.studentId);
                    } else if (term === 3) {
                        hasDataForTerm = info.accuracyTermThree !== null || addedMarkIds3.includes(info.studentId);
                    }
                }

                const isButtonDisabled = marking ? (term > 0 && !open) : !open;
                const buttonDisabled = hasDataForTerm || !isButtonDisabled;

                return (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: '0 10px' }}
                        onClick={() => handleRowClick(params.id)}
                        disabled={buttonDisabled}
                    >
                        {marking ? 'Add Mark' : 'View Details'}
                    </Button>
                );
            },
        },
        {
            field: "lastName",
            headerName: "Last Name",
            width: 400,
        },
        {
            field: "firstName",
            headerName: "First Name",
            width: 400,
        },
        {
            field: "class",
            headerName: "Class",
            width: 200,
        },
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            width: 100,
        },
    ];



    const columns = React.useMemo(
        () => allColumns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [allColumns],
    );

    return (
        <>
            <div style={{ width: '100%' }}>
                {loading ? (
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                        <CircularProgress />
                        <Typography variant="h4" className="loading-text" sx={{ mt: 2 }}>
                            Kriah Solutions
                        </Typography>
                    </Box>
                ) : (
                        <>

                            {marking && (
                                <Box sx={{ mb: 2, mt:10
                                    }}>
                                    <Button variant="outlined" color="secondary" onClick={() => setTerm(1)}>
                                        Term 1
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => { setTerm(2)}} sx={{ ml: 1 }}>
                                        Term 2
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => setTerm(3)} sx={{ ml: 1 }}>
                                        Term 3
                                    </Button>
                                </Box>
                            )}

                            {marking && term > 0 && (
                                <Box sx={{ mb: -5 }}>
                                    <Typography variant="h6">
                                        Marking for Term: <span style={{ color: 'secondary' }}>{term}</span>
                                    </Typography>
                                </Box>
                            )}
                        <Box sx={{ mb: 2, pt: 5 }}>
                            <FormControlLabel
                                label="checkboxSelection"
                                control={
                                    <Switch
                                        checked={checkboxSelection}
                                        onChange={(event) => setCheckboxSelection(event.target.checked)}
                                    />
                                }
                            />
                        </Box>
                        <Box margin={{ top: 100 }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                checkboxSelection={checkboxSelection}
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                    },
                                }}
                            />
                        </Box>

                    </>
                )}
            </div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography variant="h6">
                        {marking ? `Term ${term} Mark:` : `Student viewing:`} <span style={{ color: 'green' }}>{studentViewing.firstName} {studentViewing.lastName}</span>
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.red,
                    })}
                >
                    <CloseIcon />
                </IconButton>
                {marking ? (
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

                ) : (
                    <Table info={studentInfo} />
                )}
            </BootstrapDialog>
        </>
    );
}

export default StudentView;
