import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchCSRFToken } from '../../utils/fetchCSRFToken';

const EmployeeTasks: React.FC = () => {
    const [tasksToRate, setTasksToRate] = useState<any[]>([]);
    const [ratedTasks, setRatedTasks] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [employee, setEmployee] = useState<any>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                const csrfToken = await fetchCSRFToken();
                Cookies.set('csrftoken', csrfToken);

                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    setError('No authToken found');
                    return;
                }

                const [employeeResponse, tasksResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/employee-detail/', {
                        headers: {
                            'Authorization': `Token ${authToken}`,
                        },
                    }),
                    axios.get('http://localhost:8000/api/employee-tasks/', {
                        headers: {
                            'Authorization': `Token ${authToken}`,
                        },
                    }),
                ]);

                setEmployee(employeeResponse.data);
                setTasksToRate(tasksResponse.data.tasks_to_rate);
                setRatedTasks(tasksResponse.data.rated_tasks);
            } catch (error) {
                handleAxiosError(error);
            }
        };

        initialize();
    }, []);

    const handleAxiosError = (error: any) => {
        if (axios.isAxiosError(error)) {
            if(error.response?.status===404){
                setError(error.response?.data?.message || 'No tasks available for appraisal.');
                setTimeout(() => {
                    setError('');
                }, 1000);

            }
            else if (error.response?.status === 401) {
                setError('Unauthorized. Please log in again.');
                window.location.href = '/login';
            } else {
                setError(error.response?.data?.message || 'Error fetching tasks. Please try again later.');
            }
        } else {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    const sendTasksForAppraisal = async () => {
        const csrfToken = Cookies.get('csrftoken');
        if (!csrfToken) {
            setError('CSRF token not found');
            return;
        }

        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                setError('No authToken found');
                return;
            }

            const response = await axios.post(
                'http://localhost:8000/api/send-tasks-for-appraisal/',
                {},
                {
                    headers: {
                        'Authorization': `Token ${authToken}`,
                        'X-CSRFToken': csrfToken,
                    },
                }
            );
            console.log(response.status)
            if (response.status === 200) {
                // const updatedTasksToRate = tasksToRate.filter(task =>task.task_send==false);
                setTasksToRate([]);
                setNotification({ type: 'success', message: 'Tasks sent for appraisal successfully!' });
                setError('');
                console.log('Tasks sent for appraisal successfully', response.data);
                setTimeout(() => {
                    setNotification(null);
                }, 1000);
            } else {
                setError('Failed to send tasks for appraisal. Please try again.');
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}
            {notification && (
                <div className={`alert alert-${notification.type === 'success' ? 'success' : 'danger'}`} role="alert">
                    {notification.message}
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Tasks to Rate</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            {tasksToRate.map((task: any) => (
                                <li key={task.id} className="list-group-item">
                                    <div>
                                        <strong>Title:</strong> {task.title}
                                    </div>
                                    <div>
                                        <strong>Description:</strong> {task.description}
                                    </div>
                                    <div>
                                        <strong>Time Taken:</strong> {task.time_taken} days
                                    </div>
                                    <div>
                                        <strong>Appraisable:</strong> {task.is_appraisable ? 'Yes' : 'No'}
                                    </div>
                                </li>
                            ))}
                            {employee && employee.has_completed_one_year === true && (
                                <button onClick={sendTasksForAppraisal} className="mt-3 btn btn-primary">
                                    Send Tasks for Appraisal
                                </button>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Rated Tasks</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            {ratedTasks.map((task: any) => (
                                <li key={task.id} className="list-group-item">
                                       <div>
                                        <strong>Title:</strong> {task.title}
                                    </div>
                                    <div>
                                        <strong>Description:</strong> {task.description}
                                    </div>
                                    <div>
                                        <strong>Time Taken:</strong> {task.time_taken} days
                                    </div>
                                    <div>
                                        <strong>Rating:</strong> {task.rating}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTasks;
