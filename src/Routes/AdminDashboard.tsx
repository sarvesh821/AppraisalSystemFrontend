import { Navigate, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Rating from "../pages/Admin/Rating";
import Employees from "../pages/Admin/Employees";
import AdminSidebar from "../components/sideBars/AdminSidebar";
import Register from "../pages/Admin/Register";
import EmployeeTask from "../pages/Admin/EmployeeTask";
import ProtectedRoute from "./ProtectedRoute";

const EmployeeDashboard = () => {
  return (
    <>
      <AdminSidebar>
        <ProtectedRoute path="/">
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="rating" element={<Rating />} />
          <Route path="rating/employee/:id" element={<EmployeeTask />} />
          <Route path="employees" element={<Employees />} />
          <Route path="logout" element={<Navigate to="/login" replace />} />
        </ProtectedRoute>
      </AdminSidebar>
    </>
  );
};

export default EmployeeDashboard;
