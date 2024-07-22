import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Rating.css'

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  has_tasks_for_appraisal?: boolean;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      console.error("No auth token found");
      return;
    }

    const fetchAllEmployees = axios.get("http://127.0.0.1:8000/api/employees/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const fetchEmployeesWithTasksForAppraisal = axios.get("http://127.0.0.1:8000/api/employees-with-tasks-for-rating/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    Promise.all([fetchAllEmployees, fetchEmployeesWithTasksForAppraisal])
      .then(([allEmployeesResponse, employeesWithTasksResponse]) => {
        const allEmployees = allEmployeesResponse.data;
        const employeesWithTasks = employeesWithTasksResponse.data;
        const employeesWithTasksIds = employeesWithTasks.map((emp: Employee) => emp.id);

        const updatedEmployees = allEmployees.map((employee: Employee) => ({
          ...employee,
          has_tasks_for_appraisal: employeesWithTasksIds.includes(employee.id),
        }));
        updatedEmployees.sort((a: Employee, b: Employee) => {
          if (a.has_tasks_for_appraisal && !b.has_tasks_for_appraisal) return -1;
          if (!a.has_tasks_for_appraisal && b.has_tasks_for_appraisal) return 1;
          return 0;
        });
        setEmployees(updatedEmployees);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Error fetching employees");
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-3">
      <h1>Employee List</h1>
      <div className="list-group">
        {employees.map((employee) => (
          <Link
            key={employee.id}
            to={`/admindashboard/rating/employee/${employee.id}`}
            className="list-group-item list-group-item-action"
          >
             <span>
              {employee.first_name} {employee.last_name}
            </span>
            {employee.has_tasks_for_appraisal && <span className="dot text-success">●</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
