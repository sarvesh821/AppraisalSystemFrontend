import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchCSRFToken } from "../../utils/fetchCSRFToken";
import "./EmployeeTasks.css";

const EmployeeTasks: React.FC = () => {
  const [showAttributes, setShowAttributes] = useState(false);
 
  const [ratedTasks, setRatedTasks] = useState<any[]>([]);
  const [attributeRatings, setAttributeRatings] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);

  const attributesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const csrfToken = await fetchCSRFToken();
        Cookies.set("csrftoken", csrfToken);

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("No authToken found");
          return;
        }

        const [employeeResponse, tasksResponse, attributesResponse] =
          await Promise.all([
            axios.get("http://localhost:8000/api/employee-detail/", {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }),
            axios.get("http://localhost:8000/api/employee-tasks/", {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }),
            axios.get("http://localhost:8000/api/employee-attributes/", {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }),
          ]);

        setEmployee(employeeResponse.data);
        
        setRatedTasks(tasksResponse.data.rated_tasks);

        const ratingsArray = Object.keys(attributesResponse.data).map(
          (key) => ({
            attribute: key,
            rating: attributesResponse.data[key],
          })
        );

        setAttributeRatings(ratingsArray);
      } catch (error) {
        handleAxiosError(error);
      }
    };

    initialize();
  }, []);

  const handleAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        setError(
          error.response?.data?.message || "No tasks available for appraisal."
        );
        setTimeout(() => {
          setError("");
        }, 1000);
      } else if (error.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
        window.location.href = "/login";
      } else {
        setError(
          error.response?.data?.message ||
            "Error fetching tasks. Please try again later."
        );
      }
    } else {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  

  const handleButtonClick = () => {
    setShowAttributes((prevShowAttributes) => {
      if (!prevShowAttributes && attributesSectionRef.current) {
        setTimeout(() => {
          attributesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      return !prevShowAttributes;
    });
  };

  return (
    <div className="container mt-2">
    
      <div className="col"  >
       
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title ">Rated Tasks</h2>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Title</th>
                    <th style={{ width: '35%' }}>Description</th>
                    <th style={{ width: '20%' }}>Time Taken</th>
                    <th style={{ width: '20%' }}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {ratedTasks.map((task: any) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.time_taken} days</td>
                      <td>{task.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {showAttributes && (
          <div ref={attributesSectionRef} className="attributesSection">
            <h2 style={{backgroundColor:"#4D6CD9",height:"43px", borderRadius:"5px",padding:"8px",color:"white",marginBottom:"12px"}}>Attributes</h2>
            <div className="gridContainer">
              {attributeRatings.slice(1,-1).map(
                (attr, index) =>
                  attr.rating !== 0 && (
                    <div key={index} className="gridItem">
                      <strong>{attr.attribute}:</strong> {attr.rating}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        <button onClick={handleButtonClick} className="fixedButton">
          {showAttributes ? "Hide Attributes" : "Show Attributes"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeTasks;
