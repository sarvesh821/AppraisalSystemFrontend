
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Employee/Dashboard';
import AddTask from '../pages/Employee/AddTask';
import Profile from '../pages/Employee/Profile';
import Login from '../pages/Home/Login';
import EmployeeSidebar from '../components/sideBars/EmployeeSidebar';

const EmployeeDashboard = () => {
  return (
    <EmployeeSidebar>
      <Routes>
        <Route path="/" element={<Dashboard user={undefined} />} />
        <Route path="dashboard" element={<Dashboard user={undefined} />} />
        <Route path="addtask" element={<AddTask />} />
        <Route path="profile" element={<Profile profilePic={''} name={''} designation={''} email={''} contact={''} dateOfJoining={''} />} />
        <Route path='logout' element={<Navigate to="/login" replace />} />
      </Routes>
    </EmployeeSidebar>
  );
};

export default EmployeeDashboard;


