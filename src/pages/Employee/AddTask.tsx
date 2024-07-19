import React, { useEffect, useState } from "react";
import axios from "axios";
import getCSRFToken from "../../utils/getCSRFToken";
import "./AddTask.css";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { fetchCSRFToken } from "../../utils/fetchCSRFToken";
const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeTaken, setTimeTaken] = useState(0);
  const [isAppraisable, setIsAppraisable] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tasksToRate, setTasksToRate] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const csrfToken = getCSRFToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No authToken found");
        return;
      }

      const timeTakenInSeconds = timeTaken;

      const response = await axios.post(
        "http://localhost:8000/api/create-task/",
        {
          title,
          description,
          time_taken: timeTakenInSeconds,
          is_appraisable: isAppraisable,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "X-CSRFToken": csrfToken || "",
          },
        }
      );

      setSuccessMessage("Task added successfully!");
      console.log("Task added successfully", response.data);

      setShowModal(false);
      setTitle("");
      setDescription("");
      setTimeTaken(0);
      setIsAppraisable(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

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

        const [employeeResponse, tasksResponse] = await Promise.all([
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
        ]);
        setEmployee(employeeResponse.data);
        setTasksToRate(tasksResponse.data.tasks_to_rate);
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
        // setTasksToRate([]);
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
  return (
    <div>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
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
      <div className="col">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Tasks to Rate</h2>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "25%" }}>Title</th>
                    <th style={{ width: "35%" }}>Description</th>
                    <th style={{ width: "20%" }}>Time Taken</th>
                    <th style={{ width: "20%" }}>Appraisable</th>
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
                style={{ borderRadius: "0px" }}
              >
                Send Tasks for Appraisal
              </button>
            )}
          </div>
        </div>
      </div>

      <button className="floating-button" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                required
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeTaken">Time Taken (in Days):</label>
              <input
                type="number"
                id="timeTaken"
                name="timeTaken"
                min="0"
                required
                className="form-control"
                value={timeTaken}
                onChange={(e) => setTimeTaken(Number(e.target.value))}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                id="isAppraisable"
                name="isAppraisable"
                className="form-check-input"
                checked={isAppraisable}
                onChange={(e) => setIsAppraisable(e.target.checked)}
              />
              <label htmlFor="isAppraisable" className="form-check-label">
                Is Appraisable
              </label>
            </div>
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddTask;
