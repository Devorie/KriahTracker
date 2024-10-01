import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const CanSignUp = ({ children }) => {

    const [ permission, setPermission ] = useState(false);

    useEffect(() => {
        const Available = async () => {
            const { data } = await axios.get('/api/account/AnyUserExists');
            const p = (!data.exists);
            setPermission(p);
            console.log(permission)
        }
        Available();
    }, []);

    return permission ? children : <Navigate to="/signup" replace />;
};

export default CanSignUp;