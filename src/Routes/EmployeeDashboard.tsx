import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Employee/Dashboard';
import AddTask from '../pages/Employee/AddTask';
import Profile from '../pages/Employee/Profile';
import EmployeeSidebar from '../components/sideBars/EmployeeSidebar';
import EmployeeTasks from '../pages/Employee/EmployeeTasks';

const EmployeeDashboard = () => {
  return (
    <EmployeeSidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route
          path="/profile"
          element={<Profile first_name={''} last_name={''} designation={''} email={''} contact_no={''} date_of_joining={''}  />}
        />
        <Route path='/tasks' element={<EmployeeTasks />} />
      </Routes>
    </EmployeeSidebar>
  );
};

export default EmployeeDashboard;
