import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EmployeeTasksPage.css";

interface Task {
  id: number;
  title: string;
  description: string;
  time_taken: number;
  is_appraisable: boolean;
  task_send: boolean;
  rating?: number;
}

interface ApiResponse {
  employee_name: string;
  rated_tasks: Task[];
}

const EmployeeTasksPage: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employeeName, setEmployeeName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("No auth token found");
          return;
        }

        const response = await axios.get<ApiResponse>(
          `http://127.0.0.1:8000/api/employee-tasks/rated/${employeeId}/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        console.log("API response:", response.data);

        setEmployeeName(response.data.employee_name);
        setTasks(response.data.rated_tasks);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError("No tasks found for this employee.");
          } else {
            setError("Error fetching tasks.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      }
    };

    fetchTasks();
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="employee-tasks-page">
      <h2 style={{ color: "#4d6cd9" }}>Tasks for {employeeName}</h2>
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
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.time_taken} days</td>
              <td>{task.rating ?? "Not Rated"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTasksPage;
