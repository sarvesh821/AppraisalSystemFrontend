import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getCSRFToken from '../../utils/getCSRFToken';

const EmployeeTasks: React.FC = () => {
    const [tasksToRate, setTasksToRate] = useState<any[]>([]);
    const [ratedTasks, setRatedTasks] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [employee, setEmployee] = useState<any>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const csrfToken = getCSRFToken();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    console.error('No authToken found');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/employee-detail/', {
                    headers: {
                        'Authorization': `Token ${authToken}`,
                    },
                });

                console.log(response.data);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    setError('User not authenticated. Please log in.');
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/employee-tasks/', {
                    headers: {
                        'Authorization': `Token ${authToken}`,
                    },
                });

                setTasksToRate(response.data.tasks_to_rate);
                setRatedTasks(response.data.rated_tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                handleAxiosError(error);
            }
        };

        fetchTasks();
    }, []);

    const handleAxiosError = (error: any) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
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
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('No authToken found');
                return;
            }

            console.log(csrfToken);
            
            const response = await axios.post(
                'http://localhost:8000/api/send-tasks-for-appraisal/',
                {},
                {
                    headers: {
                        'Authorization': `Token ${authToken}`,
                        'X-CSRFToken': csrfToken || '',
                    },
                }
            );

            setNotification({ type: 'success', message: 'Tasks sent for appraisal successfully!' });
            const updatedTasksToRate = tasksToRate.filter(task => !response.data.sent_task_ids.includes(task.id));
            setTasksToRate(updatedTasksToRate);
            console.log('Tasks sent for appraisal successfully', response.data);
        } catch (error) {
            console.error('Error sending tasks for appraisal:', error);
            setNotification({ type: 'error', message: 'Failed to send tasks for appraisal. Please try again.' });
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
