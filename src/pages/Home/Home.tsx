import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
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
      <Link to="/login">
        <button className="appraisal-button">Go for Appraisal</button>
      </Link>
    </div>
  );
};

export default Home;
