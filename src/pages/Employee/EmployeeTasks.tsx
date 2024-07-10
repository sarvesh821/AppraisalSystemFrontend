import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeTasks: React.FC = () => {
    const [tasksToRate, setTasksToRate] = useState<any[]>([]);
    const [ratedTasks, setRatedTasks] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    setError('User not authenticated. Please log in.');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/employee-tasks/', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                // Assuming response.data is structured as { tasks_to_rate: [], rated_tasks: [] }
                setTasksToRate(response.data.tasks_to_rate);
                setRatedTasks(response.data.rated_tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Error fetching tasks. Please try again later.');
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="container mt-5">
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
                                    <button className="btn btn-primary mt-2">Rate Task</button>
                                </li>
                            ))}
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
