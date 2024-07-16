import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Employees.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Employee-actions.css'
import EditEmployeeModal from './EditEmployeeModal';
interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  date_of_joining: string;
  email: string;
  contact_no: string;
  
  designation:string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/employees/')
      .then(response => {
        
        
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setError('Error fetching employees');
        setLoading(false);
      });
  }, []);
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };
  const handleSave = (updatedEmployee: Employee) => {
    setEmployees(employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee));
  };
  const handleDelete = (employeeId: number) => {
    axios.delete(`http://127.0.0.1:8000/api/employees/${employeeId}/`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== employeeId));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="employee-list">
      {employees.map(employee => (
        <div key={employee.id} className="employee-card">
          <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt={employee.first_name} className="employee-pic" />
          <div className="employee-info">
            <h3>{employee.first_name} {employee.last_name}</h3>
            <p>Designation: {employee.designation}</p>
            <p>Date of Joining: {employee.date_of_joining}</p>
            <p>Email: {employee.email}</p>
            <p>Contact: {employee.contact_no}</p>
              <div className="employee-actions">
              <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(employee)} className="action-icon edit-icon" />
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(employee.id)} className="action-icon delete-icon" />

              </div>
          </div>
        </div>
      ))}
         {selectedEmployee && (
        <EditEmployeeModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          employee={selectedEmployee}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmployeeList;
