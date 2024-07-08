// Profile.tsx

import React from "react";
import './Profile.css'; 

interface ProfileProps {
    profilePic: string; 
    name: string;
    designation: string;
    email: string;
    contact: string;
    dateOfJoining: string;
}

const Profile: React.FC<ProfileProps> = () => {
    return (
        <div className="profile-card">
            <div className="profile-pic">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile" />
            </div>
            <div className="profile-info">
                <h2>Sarvesh Goyal</h2>
                <p><strong>Designation:</strong> Software Developer</p>
                <p><strong>Email:</strong> sarveshgoyal@beehyv.com</p>
                <p><strong>Contact:</strong> 7973635627</p>
                <p><strong>Date of Joining:</strong> 15<sup>th</sup>April,2024</p>
            </div>
        </div>
    );
};

export default Profile;
