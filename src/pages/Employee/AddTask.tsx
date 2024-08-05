import React, { useEffect, useState } from "react";
import axios from "axios";
import getCSRFToken from "../../utils/getCSRFToken";
import "./AddTask.css";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
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
  const [editTask, setEditTask] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
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

      setSuccessMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No authToken found");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/update-task/${editTask.id}/`,
        {
          title,
          description,
          time_taken: timeTaken,
          is_appraisable: isAppraisable,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "X-CSRFToken": csrfToken || "",
          },
        }
      );

      setSuccessMessage("Task updated successfully!");
      console.log("Task updated successfully", response.data);

      setShowEditModal(false);
      setEditTask(null);
      setTitle("");
      setDescription("");
      setTimeTaken(0);
      setIsAppraisable(false);

      setSuccessMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
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
        setNotification({
          type: "success",
          message: "Tasks sent for appraisal successfully!",
        });
        setError("");
        setNotification(null);
        window.location.reload();
      } else {
        setError("Failed to send tasks for appraisal. Please try again.");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleEditClick = (task: any) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setTimeTaken(task.time_taken);
    setIsAppraisable(task.is_appraisable);
    setShowEditModal(true);
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
      {/* Task table */}
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time Taken</th>
                    <th>Appraisable</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksToRate.map((task: any) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.time_taken} days</td>
                      <td>{task.is_appraisable ? "Yes" : "No"}</td>
                      <td>{task.task_send ? "Send" : "Pending"}</td>
                      <td>
                        {!task.task_send && (
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => handleEditClick(task)}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </td>
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

      {/* Add task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="timeTaken">Time Taken (in days)</label>
              <input
                type="number"
                className="form-control"
                id="timeTaken"
                value={timeTaken}
                onChange={(e) => setTimeTaken(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAppraisable"
                checked={isAppraisable}
                onChange={(e) => setIsAppraisable(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isAppraisable">
                Is Appraisable
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="timeTaken">Time Taken (in days)</label>
              <input
                type="number"
                className="form-control"
                id="timeTaken"
                value={timeTaken}
                onChange={(e) => setTimeTaken(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAppraisable"
                checked={isAppraisable}
                onChange={(e) => setIsAppraisable(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isAppraisable">
                Is Appraisable
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddTask;
