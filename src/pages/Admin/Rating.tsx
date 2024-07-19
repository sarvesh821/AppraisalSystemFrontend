// src/pages/EmployeeList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock Data
interface Employee {
    id: number;
    first_name: string;
    last_name:string;
  }

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No auth token found');
        return;
    }
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/employees-with-tasks-for-rating/',
        {
          headers: {
            'Authorization': `Token ${token}`,  
          
          },
        
        }
      )
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
    <div className="container mt-5">
      <h1>Employee List</h1>
      <div className="list-group">
        {employees.map(employee => (
          <Link
            key={employee.id}
            to={`/admindashboard/rating/employee/${employee.id}`}

            className="list-group-item list-group-item-action"
          >
            {employee.first_name} {employee.last_name} 
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
