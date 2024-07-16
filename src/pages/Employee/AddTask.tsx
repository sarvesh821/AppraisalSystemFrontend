import React, { useState } from 'react';
import axios from 'axios';
import getCSRFToken from '../../utils/getCSRFToken';
import './AddTask.css';

const AddTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeTaken, setTimeTaken] = useState(0); // In days
    const [isAppraisable, setIsAppraisable] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const csrfToken = getCSRFToken();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('No authToken found');
                return;
            }

            const timeTakenInSeconds = timeTaken * 24 * 60 * 60;

            const response = await axios.post(
                'http://localhost:8000/api/create-task/',
                {
                    title, 
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

           
            setTitle('');
            setDescription('');
            setTimeTaken(0);
            setIsAppraisable(false);

            setTimeout(() => {
                setSuccessMessage('');
            }, 1000);
        } catch (error) {
            console.error('Error adding task:', error);
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
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
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
        </div>
    );
};

export default AddTask;
