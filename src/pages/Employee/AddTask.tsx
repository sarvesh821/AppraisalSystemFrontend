// AddTask.tsx

import React, { useState } from "react";
import './AddTask.css'; // Import your form styles here

// interface TaskForm {
//     description: string;
//     timeTaken: number;
//     isAppraisable: boolean;
// }

const AddTask: React.FC = () => {
    // const [taskForm, setTaskForm] = useState<TaskForm>({
    //     description: "",
    //     timeTaken: 0,
    //     isAppraisable: false,
    // });

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     setTaskForm(prevState => ({
    //         ...prevState,
    //         [name]: type === 'checkbox' ? checked : value
    //     }));
    // };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Handle form submission logic here, e.g., send data to backend or parent component
    //     console.log(taskForm);
    //     // Reset form fields if needed
    //     setTaskForm({
    //         description: "",
    //         timeTaken: 0,
    //         isAppraisable: false,
    //     });
    // };

    return (
        <div className="form-container">
            <form >
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        required
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
                    />
                </div>
                <div className="form-group d-flex">
                    <input
                        type="checkbox"
                        id="isAppraisable"
                        name="isAppraisable"
                    />
                    <label htmlFor="isAppraisable" className="mt-2">Is Appraisable</label>
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
