import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { tokenAuthContext } from './AuthContext';

const ProtectedRoute = ({ children, redirectTo }) => {
    const { isAuthorised } = useContext(tokenAuthContext);
    const token = sessionStorage.getItem("token");

    return token || isAuthorised ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
