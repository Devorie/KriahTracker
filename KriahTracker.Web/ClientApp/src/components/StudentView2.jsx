import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { IconButton, Button, CircularProgress, Typography, Container, TextField, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Table from './Table';
import AddMark from './AddMark';

const VISIBLE_FIELDS = ['details', 'lastName', 'firstName', 'class'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StudentView2 = ({ marking }) => {
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

    const setTermClick = (termNumber) => {
        setTerm(termNumber);
        const longNum = (termNumber == 1 ? 'One' : termNumber == 2 ? 'Two' : 'Three')
        console.log(longNum);
        if (editing && studentViewing) {
            const termData = studentViewing[`term${longNum}`];
            setAccuracy(termData?.accuracy || '');
            setFluency(termData?.fluency || '');
            setAction(termData?.action || '');
            setNotes(termData?.notes || '');
        }
    };

    const onAddEditClick = async () => {
        if (studentViewing) {
            await axios.post(`/api/kriahtracker/addEditMark`, { studentId: studentViewing.id, term, accuracy, fluency, notes, action });
            setOpen(false);
            if (!editing) {
                const addedMarkIdsSetter = term === 1 ? setAddedMarkIds1 : term === 2 ? setAddedMarkIds2 : setAddedMarkIds3;
                addedMarkIdsSetter(prev => [...prev, studentViewing.id]);
            }
        }
    };

    const onAddTaskClick = async () => {
        if (studentViewing) {
            await axios.post(`/api/kriahtracker/addTask`, { id: studentViewing.id, task });
            setTaskDialogOpen(false);
        }
    };

    const rows = studentRows;

    const columns = useMemo(
        () => [
            {
                field: 'details',
                headerName: '',
                width: 175,
                renderCell: (params) => {
                    const studentInfo = params.row.infoByYear.find(s => s.yearId === params.row.currentYear.id);
                    const hasDataForTerm = studentInfo && (
                        (term === 1 && (studentInfo.accuracyTermOne || addedMarkIds1.includes(studentInfo.studentId))) ||
                        (term === 2 && (studentInfo.accuracyTermTwo || addedMarkIds2.includes(studentInfo.studentId))) ||
                        (term === 3 && (studentInfo.accuracyTermThree || addedMarkIds3.includes(studentInfo.studentId)))
                    );

                    return (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ margin: '0 10px' }}
                                onClick={() => handleRowClick(params.id)}
                                disabled={hasDataForTerm}
                            >
                                {marking ? 'Add Mark' : 'View Details'}
                            </Button>
                            {marking && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ margin: '0 10px' }}
                                    onClick={() => {
                                        handleRowClick(params.id);
                                        setEditing(true);
                                    }}
                                    disabled={!hasDataForTerm}
                                >
                                    Edit
                                </Button>
                            )}
                        </>
                    );
                },
            },
            { field: "lastName", headerName: "Last Name", width: 400 },
            { field: "firstName", headerName: "First Name", width: 400 },
            { field: "class", headerName: "Class", width: 200 },
            { ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 100 },
        ].filter(column => VISIBLE_FIELDS.includes(column.field)),
        [marking, term, addedMarkIds1, addedMarkIds2, addedMarkIds3]
    );

    return (
        <>
            <div style={{ width: '100%' }}>
                {loading ? (
                    <Box display="flex" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                        <CircularProgress />
                        <Typography variant="h4" sx={{ mt: 2 }}>Kriah Solutions</Typography>
                    </Box>
                ) : (
                    <>
                        {marking && (
                            <Box sx={{ mb: 2, mt: 10 }}>
                                {[1, 2, 3].map(termNum => (
                                    <Button
                                        key={termNum}
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setTermClick(termNum)}
                                        sx={{ ml: termNum > 1 ? 1 : 0 }}
                                    >
                                        Term {termNum}
                                    </Button>
                                ))}
                            </Box>
                        )}
                        <Box sx={{ mb: 2, pt: 5 }}>
                            <FormControlLabel
                                label="Checkbox Selection"
                                control={<Switch checked={checkboxSelection} onChange={(e) => setCheckboxSelection(e.target.checked)} />}
                            />
                        </Box>
                        <Box>
                            <DataGrid
                                rows={studentRows}
                                columns={columns}
                                checkboxSelection={checkboxSelection}
                                components={{ Toolbar: GridToolbar }}
                                componentsProps={{ toolbar: { showQuickFilter: true } }}
                            />
                        </Box>
                    </>
                )}
            </div>

            <BootstrapDialog onClose={() => setTaskDialogOpen(false)} open={taskDialogOpen}>
                <DialogTitle sx={{ m: 0, p: 2 }}>Add To Do Item For: {studentViewing?.firstName} {studentViewing?.lastName}</DialogTitle>
                <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextareaAutosize
                        minRows={4}
                        style={{ width: '100%', marginTop: '17px' }}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Task"
                    />
                    <Button onClick={onAddTaskClick} variant="outlined" color="secondary" sx={{ mt: 2 }}>Add Task</Button>
                </Container>
            </BootstrapDialog>

            <BootstrapDialog onClose={handleClose} open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }}>{marking ? `Term ${term} Mark` : `Student Viewing`} {studentViewing?.firstName} {studentViewing?.lastName}</DialogTitle>
                {marking ? (
                    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label="Accuracy" fullWidth margin="normal" value={accuracy} onChange={(e) => setAccuracy(e.target.value)} />
                        <TextField label="Fluency" fullWidth margin="normal" value={fluency} onChange={(e) => setFluency(e.target.value)} />
                        <TextField label="Action" fullWidth margin="normal" value={action} onChange={(e) => setAction(e.target.value)} />
                        <TextField label="Notes" fullWidth margin="normal" multiline rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" onClick={() => setTaskDialogOpen(true)} color="secondary">Add Task</Button>
                            <Button variant="contained" onClick={onAddEditClick}>{editing ? "Save Changes" : "Add Mark"}</Button>
                        </Box>
                    </Container>
                ) : (
                    <Table info={studentInfo} />
                )}
            </BootstrapDialog>
        </>
    );
};

export default StudentView2;
