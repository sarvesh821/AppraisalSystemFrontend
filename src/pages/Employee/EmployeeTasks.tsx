import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchCSRFToken } from "../../utils/fetchCSRFToken";
import "./EmployeeTasks.css";
interface Employee {
  id: number;
  user: {
    id: number;
    username: string;
  };
  date_of_joining: string;
  date_of_birth: string;
  location: string;
  designation: string;
  contact_no: string;
  role: "EMPLOYEE" | "ADMIN";
  email: string;
  first_name: string;
  last_name: string;
  has_completed_one_year: () => boolean;
}

interface Task {
  id: number;
  employee: Employee;
  title: string;
  description: string;
  time_taken: number;
  is_appraisable: boolean;
  task_send: boolean;
  rating?: number;
}

interface Attributes {
  id: number;
  employee: Employee;
  time_management?: number;
  communication?: number;
  creativity?: number;
  respect_of_deadlines?: number;
  ability_to_plan?: number;
  problem_solving?: number;
  passion_to_work?: number;
  confidence?: number;
  adaptable?: number;
  learning_power?: number;
  all_attributes_not_none: () => boolean;
}

interface AttributeRating {
  attribute: string;
  rating: number;
}

const EmployeeTasks: React.FC = () => {
  const [showAttributes, setShowAttributes] = useState(false);

  const [ratedTasks, setRatedTasks] = useState<Task[]>([]);
  const [attributeRatings, setAttributeRatings] = useState<AttributeRating[]>(
    []
  );
  const [error, setError] = useState<string>("");
  const [employee, setEmployee] = useState<Employee | null>(null);

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
            axios.get<Employee>("http://localhost:8000/api/employee-detail/", {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }),
            axios.get<{ rated_tasks: Task[] }>(
              "http://localhost:8000/api/employee-tasks/",
              {
                headers: {
                  Authorization: `Token ${authToken}`,
                },
              }
            ),
            axios.get<Attributes>(
              "http://localhost:8000/api/employee-attributes/",
              {
                headers: {
                  Authorization: `Token ${authToken}`,
                },
              }
            ),
          ]);

        setEmployee(employeeResponse.data);

        setRatedTasks(tasksResponse.data.rated_tasks);

        const ratingsArray: AttributeRating[] = Object.keys(
          attributesResponse.data
        )
          .map((key) => {
            const rating = attributesResponse.data[key as keyof Attributes];
            if (typeof rating === "number") {
              return {
                attribute: key,
                rating: rating,
              };
            }
            return null;
          })
          .filter((rating): rating is AttributeRating => rating !== null);

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
      <div className="col">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
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
            <h2
              style={{
                backgroundColor: "#4D6CD9",
                height: "43px",
                borderRadius: "5px",
                padding: "8px",
                color: "white",
                fontWeight: "530",
                letterSpacing: "1px",
                marginBottom: "12px",
                fontSize: "18px",
              }}
            >
              Attributes
            </h2>
            <div className="gridContainer">
              {attributeRatings.slice(1, -1).map(
                (attr, index) =>
                  attr.rating > 0 && (
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
