import React, { useState } from "react";
import axios from "axios";

const RegisterEmployee: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfJoining: "",
    dateOfBirth: "",
    location: "",
    designation: "",
    contactNo: "",
    role: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/register-employee/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setSuccessMessage("Employee Registered Successfully!");
      console.log("Employee registered successfully:", response.data);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error registering employee:", error);
    }

    setFormData({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      dateOfJoining: "",
      dateOfBirth: "",
      location: "",
      designation: "",
      contactNo: "",
      role: "",
      password: "",
    });
  };
  const inputStyle = {
    height: "32px",
    padding: "4px 8px",
    fontSize: "14px",
  };
  return (
    <div className="container mt-2 bg-white pt-4 border " style={{borderRadius:"17px"}}>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <h2 style={{ color: "#636364" }}>Register Employee</h2>
      <form onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                style={inputStyle}
                className="form-control"
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
                style={inputStyle}
                className="form-control"
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
                style={inputStyle}
                className="form-control"
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
                style={inputStyle}
                className="form-control"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                style={inputStyle}
                className="form-control"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                style={inputStyle}
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="dateOfJoining">Date of Joining:</label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                style={inputStyle}
                className="form-control"
                value={formData.dateOfJoining}
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
                style={inputStyle}
                className="form-control"
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
                style={inputStyle}
                className="form-control"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                style={inputStyle}
                className="form-control"
                value={formData.location}
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
                style={inputStyle}
                className="form-control"
                value={formData.designation}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{width:"533px", marginLeft:"28%", marginTop:"12px"}}>Register</button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
