import React, { useState } from 'react';
import './Register.css'; 
import axios from 'axios';

const RegisterEmployee: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        dateOfJoining: '',
        designation: '',
        contactNo: '',
        role: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            console.log(formData)
            const response = await axios.post(
                'http://localhost:8000/api/register-employee/',
                formData
            );
            setSuccessMessage('Employee Registered Sucessfully!');
            console.log('Employee registered successfully:', response.data);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error registering employee:', error);
           
        }
    
        
        setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            dateOfJoining: '',
            designation: '',
            contactNo: '',
            role: '',
            password: ''
        });
    };

    return (
        <div className="form-container">
            {successMessage && (
               <div className="alert alert-success" role="alert">
                   {successMessage}
               </div>
           )}
            <h2>Employee Info</h2>
            <form onSubmit={handleSubmit}>
              
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfJoining">Date of Joining:</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designation">Designation:</label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNo">Contact No:</label>
                    <input
                        type="tel"
                        id="contactNo"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterEmployee;
