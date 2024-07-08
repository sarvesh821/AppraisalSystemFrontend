import React from 'react';
import './Employees.css';

interface Employee {
  id: number;
  name: string;
  designation: string;
  dateOfJoining: string;
  email: string;
  contact: string;
  profilePic: string;
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    dateOfJoining: '2020-01-01',
    email: 'john.doe@example.com',
    contact: '123-456-7890',
    profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    dateOfJoining: '2020-01-01',
    email: 'john.doe@example.com',
    contact: '123-456-7890',
    profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    dateOfJoining: '2020-01-01',
    email: 'john.doe@example.com',
    contact: '123-456-7890',
    profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  
 
];

const EmployeeList: React.FC = () => {
  return (
    <div className="employee-list">
      {employees.map(employee => (
        <div key={employee.id} className="employee-card">
          <img src={employee.profilePic} alt={employee.name} className="employee-pic" />
          <div className="employee-info">
            <h3>{employee.name}</h3>
            <p>Designation: {employee.designation}</p>
            <p>Date of Joining: {employee.dateOfJoining}</p>
            <p>Email: {employee.email}</p>
            <p>Contact: {employee.contact}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
