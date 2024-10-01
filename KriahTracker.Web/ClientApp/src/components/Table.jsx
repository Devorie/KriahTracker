import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

function newRow(infoForYear) {
    return {
        id: infoForYear.id,
        year: infoForYear.year.name,
        class: infoForYear.class,
        accuracyTermOne: infoForYear.accuracyTermOne ? infoForYear.accuracyTermOne.slice(0, 7) : 'N/A',
        fluencyTermOne: infoForYear.fluencyTermOne ? infoForYear.fluencyTermOne.slice(0, 7) : 'N/A',
        actionTermOne: infoForYear.actionTermOne,
        accuracyTermTwo: infoForYear.accuracyTermTwo ? infoForYear.accuracyTermTwo.slice(0, 7) : 'N/A',
        fluencyTermTwo: infoForYear.fluencyTermTwo ? infoForYear.fluencyTermTwo.slice(0, 7) : 'N/A',
        actionTermTwo: infoForYear.actionTermTwo,
        accuracyTermThree: infoForYear.accuracyTermThree ? infoForYear.accuracyTermThree.slice(0, 7) : 'N/A',
        fluencyTermThree: infoForYear.fluencyTermThree ? infoForYear.fluencyTermThree.slice(0, 7) : 'N/A',
        actionTermThree: infoForYear.actionTermThree,
        history: [
            {
                term: 'Term 1',
                accuracy: infoForYear.accuracyTermOne ? infoForYear.accuracyTermOne : 'N/A',
                fluency: infoForYear.fluencyTermOne ? infoForYear.fluencyTermOne : 'N/A',
                notes: infoForYear.notesTermOne ? infoForYear.notesTermOne : 'N/A',
                action: infoForYear.actionTermOne
            },
            {
                term: 'Term 2',
                accuracy: infoForYear.accuracyTermTwo ? infoForYear.accuracyTermTwo : 'N/A',
                fluency: infoForYear.fluencyTermTwo ? infoForYear.fluencyTermTwo : 'N/A',
                notes: infoForYear.notesTermTwo ? infoForYear.notesTermTwo : 'N/A',
                action: infoForYear.actionTermTwo
            },
            {
                term: 'Term 3',
                accuracy: infoForYear.accuracyTermThree ? infoForYear.accuracyTermThree : 'N/A',
                fluency: infoForYear.fluencyTermThree ? infoForYear.fluencyTermThree : 'N/A',
                notes: infoForYear.notesTermThree ? infoForYear.notesTermThree : 'N/A',
                action: infoForYear.actionTermThree
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.class}</TableCell>
                <TableCell align="right"><span style={{ color: '#1b58bb' }}>{row.accuracyTermOne}</span></TableCell>
                <TableCell align="right"><span style={{ color: '#1b58bb' }}>{row.fluencyTermOne}</span></TableCell>
                <TableCell>{row.actionTermOne ? <CheckIcon style={{ color: '#2E7D32' }} /> : <CloseIcon style={{ color: '#d2aeae' }} />}</TableCell>
                <TableCell align="right"><span style={{ color: '#1b58bb' }}>{row.accuracyTermTwo}</span></TableCell>
                <TableCell align="right"><span style={{ color: '#1b58bb' }}>{row.fluencyTermTwo}</span></TableCell>
                <TableCell>{row.actionTermTwo ? <CheckIcon style={{ color: '#2E7D32' }} /> : <CloseIcon style={{ color: '#d2aeae' }} />}</TableCell>
                <TableCell align="right"><span style={{ color: '#1b58bb' }}>{row.accuracyTermThree}</span></TableCell>
                <TableCell align="right"><span style={{ color: '#1b58bb' }}>{row.fluencyTermThree}</span></TableCell>
                <TableCell>{row.actionTermThree ? <CheckIcon style={{ color: '#2E7D32' }} /> : <CloseIcon style={{ color: '#d2aeae' }} />}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">History</Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Accuracy</TableCell>
                                        <TableCell>Fluency</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.term}>
                                            <TableCell component="th" scope="row">{historyRow.term}</TableCell>
                                            <TableCell><span style={{ color: '#1b58bb' }}>{historyRow.accuracy}</span></TableCell>
                                            <TableCell><span style={{ color: '#1b58bb' }}>{historyRow.fluency}</span></TableCell>
                                            <TableCell><span style={{ color: '#1b58bb' }}>{historyRow.notes}</span></TableCell>
                                            <TableCell>{historyRow.action ? historyRow.action : <CloseIcon style={{ color: '#d2aeae' }} />}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({ info }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const newRows = info.map(newRow);
        setRows(newRows); // Set all rows at once
    }, [info]);
    

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Year</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell align="center">Term 1 Accuracy</TableCell>
                        <TableCell align="center">Term 1 Fluency</TableCell>
                        <TableCell align="center">Term 1 Action</TableCell>
                        <TableCell align="center">Term 2 Accuracy</TableCell>
                        <TableCell align="center">Term 2 Fluency</TableCell>
                        <TableCell align="center">Term 2 Action</TableCell>
                        <TableCell align="center">Term 3 Accuracy</TableCell>
                        <TableCell align="center">Term 3 Fluency</TableCell>
                        <TableCell align="center">Term 3 Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
