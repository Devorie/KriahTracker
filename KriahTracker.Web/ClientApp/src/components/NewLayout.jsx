import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Home as HomeIcon, History as HistoryIcon, PersonAdd, CloudUpload, Update } from '@mui/icons-material';
import { useAuth } from '../AuthContext';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1 }}>KriahTracker</div>
                    <IconButton edge="end" color="inherit" onClick={handleMenu}>
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {user ? (
                            <MenuItem onClick={handleClose}>
                                <MenuItem button component={Link} to="/signout">Logout</MenuItem>
                            </MenuItem>
                        ) : (
                            [
                                <MenuItem key="login" onClick={handleClose}>
                                    <MenuItem button component={Link} to="/login">Login</MenuItem>
                                </MenuItem>,
                                <MenuItem key="setup-account" onClick={handleClose}>
                                    <MenuItem button component={Link} to="/signup">Set Up Account</MenuItem>
                                </MenuItem>
                            ]
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/tasktable">
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary="Task Table" />
                    </ListItem>
                    <ListItem button component={Link} to="/viewstudenthistory">
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary="Students History" />
                    </ListItem>
                    <ListItem button component={Link} to="/studentsbytutor">
                        <ListItemIcon><PersonSearchIcon /></ListItemIcon>
                        <ListItemText primary="View Students By Tutor" />
                    </ListItem>
                    <ListItem button component={Link} to="/studentmarking">
                        <ListItemIcon><PersonAdd /></ListItemIcon>
                        <ListItemText primary="Add Marks" />
                    </ListItem>
                    <ListItem button component={Link} to="/upload">
                        <ListItemIcon><CloudUpload /></ListItemIcon>
                        <ListItemText primary="Upload Students" />
                    </ListItem>
                    <ListItem button component={Link} to="/addstudent">
                        <ListItemIcon><PersonAdd /></ListItemIcon>
                        <ListItemText primary="Add Student Manually" />
                    </ListItem>
                    <ListItem button component={Link} to="/updateyear">
                        <ListItemIcon><Update /></ListItemIcon>
                        <ListItemText primary="Update Year" />
                    </ListItem>
                    <ListItem button component={Link} to="/managetutors">
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="Manage Tutors" />
                    </ListItem>
                    
                    
                </List>
            </Drawer>
            <main style={{ marginTop: '64px' }}> {/* Adjust based on AppBar height */}
                {children}
            </main>
        </div>
    );
};

export default Layout;