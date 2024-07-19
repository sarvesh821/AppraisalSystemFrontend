import React, { useEffect, useState } from "react";
import { FaUsers, FaTasks } from "react-icons/fa";
import "./Dashboard.css";
import axios from "axios";

const AdminMainDashboard: React.FC = () => {
  const [userData, setUserData] = useState<number>(0);
  const [unratedEmployeesCount, setUnratedEmployeesCount] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      try {
        const usersResponse = await axios.get(
          "http://localhost:8000/api/current-employees/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const unratedEmployeesResponse = await axios.get(
          "http://localhost:8000/api/unrated-employees/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUnratedEmployeesCount(unratedEmployeesResponse.data.count);
        setUserData(usersResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="admin-main-content">
      <h1>Welcome to Beehyv Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <h3>Employees</h3>
            <p>{userData}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTasks className="stat-icon" />
          <div className="stat-info">
            <h3>Tasks</h3>
            <p>{unratedEmployeesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainDashboard;
