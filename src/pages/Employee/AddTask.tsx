// AddTask.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getCSRFToken from '../../utils/getCSRFToken';
import './AddTask.css';

const AddTask: React.FC = () => {
    const [description, setDescription] = useState('');
    const [timeTaken, setTimeTaken] = useState(0); // In days
    const [isAppraisable, setIsAppraisable] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [employee, setEmployee] = useState<any>(null);
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

                console.log(response.data); // Check the structure of response.data

                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('No authToken found');
                return;
            }

            // Convert days to seconds (since DurationField can accept seconds)
            const timeTakenInSeconds = timeTaken * 24 * 60 * 60;

            const response = await axios.post(
                'http://localhost:8000/api/create-task/',
                {
                    description,
                    time_taken: timeTakenInSeconds,
                    is_appraisable: isAppraisable
                },
                {
                    headers: {
                        'Authorization': `Token ${authToken}`,
                        'X-CSRFToken': csrfToken || '',
                    },
                }
            );

            setSuccessMessage('Task added successfully!');
            console.log('Task added successfully', response.data);

            setDescription('');
            setTimeTaken(0);
            setIsAppraisable(false);

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const sendTasksForAppraisal = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('No authToken found');
                return;
            }

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

            console.log('Tasks sent for appraisal successfully', response.data);
            // Optionally show a success message or handle the response as needed
        } catch (error) {
            console.error('Error sending tasks for appraisal:', error);
        }
    };

    return (
        <div className="form-container">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        required
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
                        value={timeTaken}
                        onChange={(e) => setTimeTaken(Number(e.target.value))}
                    />
                </div>
                <div className="form-group d-flex">
                    <input
                        type="checkbox"
                        id="isAppraisable"
                        name="isAppraisable"
                        checked={isAppraisable}
                        onChange={(e) => setIsAppraisable(e.target.checked)}
                    />
                    <label htmlFor="isAppraisable" className="mt-2">Is Appraisable</label>
                </div>
                <button type="submit">Add Task</button>
            </form>
            {employee && employee.has_completed_one_year === true && (
                <button onClick={sendTasksForAppraisal} className="mt-3 btn btn-primary">
                    Send Tasks for Appraisal
                </button>
            )}
        </div>
    );
};

export default AddTask;
