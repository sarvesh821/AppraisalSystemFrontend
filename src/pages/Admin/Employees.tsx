import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Employees.css';

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
