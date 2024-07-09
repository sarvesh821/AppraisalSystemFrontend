
import { Navigate, Route, Routes } from 'react-router-dom';


import Login from '../pages/Home/Login';

import Dashboard from '../pages/Admin/Dashboard';
import Rating from '../pages/Admin/Rating';
import Employees from '../pages/Admin/Employees';
import AdminSidebar from '../components/sideBars/AdminSidebar';
import Register from '../pages/Admin/Register';
import EmployeeTask from '../pages/Admin/EmployeeTask';

const EmployeeDashboard = () => {
  return (
    <AdminSidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard  />} />
        <Route path="register" element={<Register />} />
        <Route path="rating" element={<Rating />} />
        
        <Route path="rating/employee/:id" element={<EmployeeTask/>} />
        <Route path="employees" element={<Employees/>}/>
        <Route path='logout' element={<Navigate to="/login" replace />} />
      </Routes>
    </AdminSidebar>
  );
};

export default EmployeeDashboard;


