import { Route } from "react-router-dom";
import Dashboard from "../pages/Employee/Dashboard";
import AddTask from "../pages/Employee/AddTask";
import Profile from "../pages/Employee/Profile";
import EmployeeSidebar from "../components/sideBars/EmployeeSidebar";
import EmployeeTasks from "../pages/Employee/EmployeeTasks";
import ProtectedRoute from "./ProtectedRoute";

const EmployeeDashboard = () => {
  return (
    <EmployeeSidebar>
      <ProtectedRoute path="/">
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<EmployeeTasks />} />
      </ProtectedRoute>
    </EmployeeSidebar>
  );
};

export default EmployeeDashboard;
