import React, { useEffect, useState } from "react";
import './Profile.css'; 
import axios from "axios";

interface ProfileProps {
    first_name: string;
    last_name: string;
    designation: string;
    email: string;
    contact_no: string;
    date_of_joining: string;
   
    date_of_birth: string;
   
    location: string;
}

const Profile: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<ProfileProps | null>(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    console.error('No authToken found');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/employee-detail/', {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });

                setEmployeeData(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    if (!employeeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-card ">
            <div className="profile-info">
      <h2 className="mb-4 ">{employeeData.first_name} {employeeData.last_name}</h2>
      <div className="grid-container">
       
        <div><strong>Designation:</strong> {employeeData.designation}</div>
        <div><strong>Contact:</strong> {employeeData.contact_no}</div>
        <div><strong>Email:</strong> {employeeData.email}</div>
        <div><strong>Date of Birth:</strong> {employeeData.date_of_birth}</div>
        <div><strong>Date of Joining:</strong> {employeeData.date_of_joining}</div>
        <div><strong>Office Location:</strong> {employeeData.location}</div>
      </div>
    </div>
            <div className="profile-pic">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile" />
            </div>
        </div>
    );
};

export default Profile;
