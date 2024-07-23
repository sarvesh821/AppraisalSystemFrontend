import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGoForAppraisal = async () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-info/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        const userRole = response.data.is_staff;

        if (userRole) {
          navigate("/admindashboard");
        } else {
          navigate("/employeedashboard");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container main-body">
      <div className="title-box">
        <img
          src="https://beesheetsv2.beehyv.com/assets/images/logo.png"
          alt="Beehyv-Image"
          height={"100px"}
          width={"290px"}
        />
        <h1 className="title">APPRAISAL SYSTEM</h1>
      </div>
      <button className="appraisal-button" onClick={handleGoForAppraisal}>
        Go for Appraisal
      </button>
    </div>
  );
};

export default Home;
