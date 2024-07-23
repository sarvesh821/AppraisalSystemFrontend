import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import validateAuthToken from "./ValidateAuthTokenadmin";

interface ProtectedRouteProps {
  path: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  path,
  ...rest
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await validateAuthToken();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
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
