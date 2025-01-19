import React, { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Checkbox, } from '@mui/material';
import axios from 'axios';


const TaskTable = () => {
    useEffect(() => {
        const loadtasks = async () => {
            const { data } = await axios.get('/api/kriahtracker/getListOfTasks');
            setTaskList(data);
            console.log(tasks);
        }
        loadtasks();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [taskList, setTaskList] = useState([]);

   
    // Filtered task list based on search term
    const filteredTasks = useMemo(() => {
        return taskList.filter((task) =>
            task.task.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [taskList, searchTerm]);

    // Function to mark task as completed
    const handleTaskCompletion = (taskId) => {
        setTaskList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Function to remove task
    const handleRemoveTask = (taskId) => {
        setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <TextField
                label="Search Tasks"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {taskList.some((task) => task.studentName !== null) ? (
                                <>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>Student Class</TableCell>
                                </>
                            ) : null}
                            <TableCell>Task</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks.map((task) => (
                            <TableRow key={task.id}>
                                {task.studentName !== null ? (
                                    <>
                                        <TableCell>{task.studentName || 'N/A'}</TableCell>
                                        <TableCell>{task.studentClass || 'N/A'}</TableCell>
                                    </>
                                ) : null}
                                <TableCell>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => handleTaskCompletion(task.id)}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                        }}
                                    >
                                        {task.task}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveTask(task.id)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TaskTable;
