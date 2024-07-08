// Dashboard.tsx

import React from "react";
import './Dashboard.css'; // Import your dashboard styles here

interface User {
    name: string;
    designation: string;
    dateOfJoining: string; // Consider using Date type if possible
    email: string;
    contact: string;
}

interface DashboardProps {
    user: User; // User data passed as props
}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div className="dashboard-container">
            <div className="user-info">
                <h2>Welcome, {"Sarvesh Goyal"}!</h2>
                <p><strong>Designation:</strong> Software Developer</p>
                <p><strong>Date of Joining:</strong> 15<sup>th</sup>April,2024</p>
                <p><strong>Email:</strong> sarveshgoyal@beehyv.com</p>
                <p><strong>Contact:</strong>7973635627</p>
            </div>
            {/* Add more dashboard widgets or components as needed */}
        </div>
    );
};

export default Dashboard;
