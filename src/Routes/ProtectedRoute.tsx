// ProtectedRoute.tsx

import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const isAuthenticated = (): boolean => {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
};

interface ProtectedRouteProps {
    path: string;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path, ...rest }) => {
    return isAuthenticated() ? (
        <Routes>
            <Route path={path} {...rest}>
                {children}
            </Route>
        </Routes>
    ) : (
        <Navigate to="/error" replace />
    );
};

export default ProtectedRoute;
