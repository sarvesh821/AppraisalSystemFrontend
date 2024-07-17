import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchCSRFToken } from "../../utils/fetchCSRFToken";
import "./EmployeeTasks.css";

const EmployeeTasks: React.FC = () => {
  const [showAttributes, setShowAttributes] = useState(false);
  const [tasksToRate, setTasksToRate] = useState<any[]>([]);
  const [ratedTasks, setRatedTasks] = useState<any[]>([]);
  const [attributeRatings, setAttributeRatings] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
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
        setTasksToRate(tasksResponse.data.tasks_to_rate);
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

  const sendTasksForAppraisal = async () => {
    const csrfToken = Cookies.get("csrftoken");
    if (!csrfToken) {
      setError("CSRF token not found");
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("No authToken found");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/send-tasks-for-appraisal/",
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (response.status === 200) {
        setTasksToRate([]);
        setNotification({
          type: "success",
          message: "Tasks sent for appraisal successfully!",
        });
        setError("");
        setTimeout(() => {
          setNotification(null);
        }, 1000);
      } else {
        setError("Failed to send tasks for appraisal. Please try again.");
      }
    } catch (error) {
      handleAxiosError(error);
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
      {error && <div className="alert alert-danger">{error}</div>}
      {notification && (
        <div
          className={`alert alert-${
            notification.type === "success" ? "success" : "danger"
          }`}
          role="alert"
        >
          {notification.message}
        </div>
      )}
      <div className="col"  >
        {/* <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Tasks to Rate</h2>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time Taken</th>
                    <th>Appraisable</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksToRate.map((task: any) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.time_taken} days</td>
                      <td>{task.is_appraisable ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {employee && employee.has_completed_one_year === true && (
              <button
                onClick={sendTasksForAppraisal}
                className="mt-3 btn btn-primary"
                style={{borderRadius:'0px'}}
              >
                Send Tasks for Appraisal
              </button>
            )}
          </div>
        </div> */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header ">
              <h2 className="card-title ">Rated Tasks</h2>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time Taken</th>
                    <th>Rating</th>
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
            <h2>Attributes</h2>
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
