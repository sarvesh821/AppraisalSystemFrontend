import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Home/Login';

import EmployeeDashboard from './Routes/EmployeeDashboard';
import AdminDashboard from './Routes/AdminDashboard';
import ErrorPage from './pages/Home/ErrorPage';
import { useNavigationGuard } from './Routes/UsePreventBack';

function App() {
  useNavigationGuard();
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path='/employeedashboard/*' element={<EmployeeDashboard />} />
        <Route path='/admindashboard/*' element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
