// src/pages/EmployeeList.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Mock Data
const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  // Add more employees as needed
];

const EmployeeList = () => {
  return (
    <div className="container mt-5">
      <h1>Employee List</h1>
      <div className="list-group">
        {employees.map(employee => (
          <Link
            key={employee.id}
            to={`employee/${employee.id}`}
            className="list-group-item list-group-item-action"
          >
            {employee.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
