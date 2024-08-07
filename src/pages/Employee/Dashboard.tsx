import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";


interface User {
  first_name: string;
  last_name: string;
  designation: string;
}

const Dashboard: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<User | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("No authToken found");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/employee-detail/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        setEmployeeData(response.data);

        const now = new Date();
        const formattedDate = formatDate(now);
        setCurrentDate(formattedDate);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info">
      <h2>
        Welcome, {employeeData.first_name} {employeeData.last_name}!
      </h2>
      <p>{employeeData.designation}</p>
      <p>{currentDate}</p>
    </div>
  );
};

export default Dashboard;
