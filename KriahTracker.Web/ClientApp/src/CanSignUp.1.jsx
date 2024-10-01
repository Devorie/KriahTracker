import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const CanSignUp = ({ children }) => {

    const { permission, setPermission } = useState();

    useEffect(() => {
        const Available = async () => {
            const { data } = await axios.get('/api/account/AnyUserExists');
            const p = (!data.exists);
            console.log(p);
            setPermission(p);
            console.log(permission);
        };
        Available();
    }, []);

    return permission ? children : <Navigate to="/signup" replace />;
};
