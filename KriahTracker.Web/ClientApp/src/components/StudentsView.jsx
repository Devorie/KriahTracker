import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { IconButton, Button, CircularProgress, Typography, Container, TextField, TextareaAutosize, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Table from './Table';
import AddMark from './AddMark';
import { act } from 'react';

const VISIBLE_FIELDS = ['buttons', 'lastName', 'firstName', 'class'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StudentView = ({ marking, editClass, tutorId }) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);
    const [task, setTask] = useState('');
    const [studentViewing, setStudentViewing] = useState(null);
    const [term, setTerm] = useState(0);
    const [studentInfo, setStudentInfo] = useState([]);
    const [studentRows, setStudentRows] = useState([]);
    const [checkboxSelection, setCheckboxSelection] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accuracy, setAccuracy] = useState('');
    const [fluency, setFluency] = useState('');
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState('');
    const [editedClasses, setEditedClasses] = useState([]); // Track edited classes
    const [editingClassIds, setEditingClassIds] = useState([]); // Track which rows are in edit mode
    const [addedMarkIds1, setAddedMarkIds1] = useState([]);
    const [addedMarkIds2, setAddedMarkIds2] = useState([]);
    const [addedMarkIds3, setAddedMarkIds3] = useState([]);
    const [editedMarkIds1, setEditedMarkIds1] = useState([]);
    const [editedMarkIds2, setEditedMarkIds2] = useState([]);
    const [editedMarkIds3, setEditedMarkIds3] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(new Option());

    const tutors = [
        {
            id: 1,
            name: 'Channie'
        },
        {
            id: 2,
            name: 'Mrs. F'
        },
        {
            id: 3,
            name: 'Foo Bar'
        },
        {
            id: 4,
            name: 'someone'
        }
    ]

    useEffect(() => {
        const loadStudents = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/kriahtracker/getStudents', {tutorId: tutorId ? tutorId : 0});
                setStudentRows(data);
            } finally {
                setLoading(false);
            }
        };
        loadStudents();
    }, []);

    const handleRowClick = async (id, edit) => {
        const selectedStudent = rows.find(r => r.id === id);
        setEditing(edit);
        console.log(id);
        console.log(selectedStudent);
        if (selectedStudent) {
            setStudentViewing(selectedStudent);
            setStudentInfo(selectedStudent.infoByYear);
            console.log('studentInfo');
            console.log(studentInfo);
            if (edit) {
                const currentInfo = studentInfo.find(i => i.class == selectedStudent.class)
                console.log('currentInfo');
                console.log(currentInfo);
                if (currentInfo) {
                    if (term === 1) {
                        setAccuracy(currentInfo.accuracyTermOne);
                        setFluency(currentInfo.fluencyTermOne);
                        setAction(currentInfo.actionTermOne);
                        setNotes(currentInfo.notesTermOne);
                    } else if (term === 2) {
                        setAccuracy(currentInfo.accuracyTermTwo);
                        setFluency(currentInfo.fluencyTermTwo);
                        setAction(currentInfo.actionTermTwo);
                        setNotes(currentInfo.notesTermTwo);
                    } else if (term === 3) {
                        setAccuracy(currentInfo.accuracyTermThree);
                        setFluency(currentInfo.fluencyTermThree);
                        setAction(currentInfo.actionTermThree);
                        setNotes(currentInfo.notesTermThree);
                    }
                }
            }
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        
        setStudentViewing('');
        /*setStudentInfo('');*/
        
    };

    const handleEditClassClick = (id) => {
        setEditingClassIds((prevIds) => [...prevIds, id]);
    };

    const handleClassChange = (id, newClass) => {
        setStudentRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, class: newClass } : row
            )
        );

        setEditedClasses((prev) => {
            const existingEntry = prev.find((entry) => entry.studentId === id);
            if (existingEntry) {
                return prev.map((entry) =>
                    entry.studentId === id ? { ...entry, newClass } : entry
                );
            } else {
                return [...prev, { studentId: id, newClass }];
            }
        });
        console.log(editedClasses);
    };

    const confirmChanges = async () => {
        try {
            await axios.post('/api/kriahtracker/editClass', editedClasses);
            setEditingClassIds([]);
            alert('Changes saved successfully');
        } catch (error) {
            console.error('Error saving changes', error);
            alert('Failed to save changes');
        }
    };

    const setTermClick = async (termNumber) => {
        setTerm(termNumber);        
    }

    const onAddEditClick = async () => {
        await axios.post(`/api/kriahtracker/addEditMark`, { studentId: studentViewing.id, term, accuracy, fluency, notes, action, tutorId: selectedTutor.id });

        if (!editing) {
            if (term === 1) {
                setAddedMarkIds1([...addedMarkIds1, studentViewing.id]);
            } else if (term === 2) {
                setAddedMarkIds2([...addedMarkIds2, studentViewing.id]);
            } else if (term === 3) {
                setAddedMarkIds3([...addedMarkIds3, studentViewing.id]);
            }
        }
        if (editing) {
            if (term === 1) {
                setEditedMarkIds1([...editedMarkIds1, studentViewing.id]);
            } else if (term === 2) {
                setEditedMarkIds2([...editedMarkIds2, studentViewing.id]);
            } else if (term === 3) {
                setEditedMarkIds3([...editedMarkIds3, studentViewing.id]);
            }
        }
        setOpen(false);
    }

    const onAddTaskClick = async () => {
        await axios.post(`/api/kriahtracker/addTask`, { id: studentViewing.id, task });
        setTaskDialogOpen(false);
    }

    const rows = studentRows;

    const columns = useMemo(
        () => [
            {
                field: 'buttons',
                headerName: '',
                width: marking ? '300': '175'
,
                renderCell: (params) => {
                    const info = params.row.infoByYear.find(s => s.yearId === params.row.currentYear.id);
                    const hasDataForTerm = marking && (
                        (term === 1 && (info?.accuracyTermOne !== null || addedMarkIds1.includes(info?.studentId))) ||
                        (term === 2 && (info?.accuracyTermTwo !== null || addedMarkIds2.includes(info?.studentId))) ||
                        (term === 3 && (info?.accuracyTermThree !== null || addedMarkIds3.includes(info?.studentId)))
                    );
                    const wasEditedForTerm = marking && (
                        (term === 1 && editedMarkIds1.includes(info?.studentId)) ||
                        (term === 2 && editedMarkIds2.includes(info?.studentId)) ||
                        (term === 3 && editedMarkIds3.includes(info?.studentId))
                    );

                    return (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ margin: '0 10px' }}
                                onClick={editClass ? () => handleEditClassClick(params.id) : () => handleRowClick(params.id, false)}
                                disabled={editClass && editingClassIds ? editingClassIds.includes(params.id) : marking && (!term || hasDataForTerm)}
                            >
                                {marking ? 'Add Mark' : editClass ? 'Edit Class':'View Details'}
                            </Button>
                            {marking && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ margin: '0 10px' }}
                                    onClick={() => handleRowClick(params.id, true)}
                                    disabled={wasEditedForTerm || !hasDataForTerm || (term === 1 && addedMarkIds1.includes(info?.studentId)) ||
                                        (term === 2 && addedMarkIds2.includes(info?.studentId)) || (term === 3 && addedMarkIds3.includes(info?.studentId))}
                                >
                                    {wasEditedForTerm ? 'Already Edited' : ((term === 1 && addedMarkIds1.includes(info?.studentId)) ||
                                        (term === 2 && addedMarkIds2.includes(info?.studentId)) || (term === 3 && addedMarkIds3.includes(info?.studentId)))
                                        ? 'Just Added' : 'Edit'}
                                </Button>
                            )}
                        </>
                    );
                },
            },
            { field: "lastName", headerName: "Last Name", width: 400 },
            { field: "firstName", headerName: "First Name", width: 400 },
            {
                field: 'class',
                headerName: 'Class',
                width: 200,
                renderCell: (params) =>
                    editClass && editingClassIds.includes(params.id) ? (
                        <TextField
                            value={params.value}
                            onChange={(e) => handleClassChange(params.id, e.target.value)}
                            variant="standard"
                        />
                    ) : (
                        params.value
                    ),
            },
            { ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 100 },
        ].filter(column => VISIBLE_FIELDS.includes(column.field)),
        [marking, term, addedMarkIds1, addedMarkIds2, addedMarkIds3, editing, studentViewing, editClass, editingClassIds, studentRows] // Add editing and studentViewing here
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
                            <Box sx={{
                                mb: 2, mt: 10
                            }}>
                                <Button variant="outlined" color="secondary" onClick={() => setTermClick(1)}>
                                    Term 1
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => setTermClick(2)} sx={{ ml: 1 }}>
                                    Term 2
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => setTermClick(3)} sx={{ ml: 1 }}>
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
                            <Box sx={{ width: '100%' }}>
                                {loading ? (
                                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                                        <CircularProgress />
                                        <Typography variant="h4" className="loading-text" sx={{ mt: 2 }}>
                                            Kriah Solutions
                                        </Typography>
                                    </Box>
                                ) : (
                                    <>
                                        {editClass && editedClasses.length > 0 && (
                                            <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
                                                <Button variant="contained" color="secondary" onClick={confirmChanges}>
                                                    Confirm Changes
                                                </Button>
                                            </Box>
                                        )}
                                        <DataGrid
                                            rows={studentRows}
                                            columns={columns}
                                            checkboxSelection={checkboxSelection }
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{ toolbar: { showQuickFilter: true } }}
                                        />
                                    </>
                                )}
                            </Box>

                    </>
                )}
            </div>
            <BootstrapDialog
                onClose={() => setTaskDialogOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={taskDialogOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography variant="h6">
                        {`Add Task For: `}
                        < span style={{ color: 'green' }}>{studentViewing && `${studentViewing.firstName} ${studentViewing.lastName}`}</span>
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setTaskDialogOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.red,
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextareaAutosize
                        minRows={4}
                        style={{ width: '100%', marginTop: '17px' }}
                        margin="normal"
                        onChange={e => setTask(e.target.value)}
                        value={task}
                        placeholder="Task"
                    />
                    <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <Button onClick={onAddTaskClick} variant="outlined" color="secondary">Add Task</Button>
                    </div>
                </Container>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography variant="h6">
                        {marking ? `Term ${term} Mark:` : `Student viewing:`} <span style={{ color: 'green' }}>{studentViewing && `${studentViewing.firstName} ${studentViewing.lastName}`}</span>
                    </Typography>
                </DialogTitle>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setTaskDialogOpen(true)}
                    >
                        Add Task
                    </Button>
                </Box>
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
                        {action && <Autocomplete
                            options={tutors}
                            getOptionLabel={(option) => option.name}
                            fullWidth
                            margin="normal"
                            renderInput={(params) => <TextField {...params} label="Tutor" variant="outlined" />}
                            onChange={(e, value) => setSelectedTutor(value)}
                        /> }
                        <TextareaAutosize
                            minRows={4}
                            style={{ width: '100%', marginTop: '17px' }}
                            margin="normal"
                            onChange={e => setNotes(e.target.value)}
                            value={notes}
                            placeholder="Notes"
                        />
                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                            <Button onClick={onAddEditClick} variant="outlined" color="secondary">{editing ? 'Update' : 'Add Mark'}</Button>
                        </div>
                    </Container>

                ) : (
                    <Table info={studentInfo} />
                )}
            </BootstrapDialog>
        </>
    );
};

export default StudentView;
