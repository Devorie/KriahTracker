import { useState, useEffect, useContext, createContext } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    if (isLoading) {
        return (<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
            <CircularProgress />
            <Typography variant="h4" className="loading-text" sx={{ mt: 2 }}>
                Kriah Solutions
            </Typography>
        </Box>)
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}


const useAuth = () => useContext(AuthContext);


export { AuthContextComponent, useAuth };