import React from 'react';
import { FaUsers, FaTasks, FaChartBar } from 'react-icons/fa';
import './Dashboard.css';

const AdminMainDashboard: React.FC = () => {
    return (
        <div className="admin-main-content">
            <h1>Welcome to Beehyv Admin Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <FaUsers className="stat-icon" />
                    <div className="stat-info">
                        <h3>Users</h3>
                        <p>150</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaTasks className="stat-icon" />
                    <div className="stat-info">
                        <h3>Tasks</h3>
                        <p>300</p>
                    </div>
                </div>
               
            </div>
           
        </div>
    );
};

export default AdminMainDashboard;
