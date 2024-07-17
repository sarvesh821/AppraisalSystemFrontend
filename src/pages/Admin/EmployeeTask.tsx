
import  { useState, useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface Task {
    id: number;
    title:string;
    description: string;
    time_taken: string; 
    is_appraisable: boolean;

    rating:number;
  }


const EmployeeDetail = () => {
    const attribute_names=['Time Management','Communication','Creativity','Respect deadlines','Ability to plan','Problen solving','Passion for work','Confidence','Adaptable','Learning power']
  const { id } = useParams<{ id: string }>();
  const [employeeName, setEmployeeName] = useState('');
  const [attributeRatings, setAttributeRatings] = useState(Array(10).fill(0));
  const [employeeTasks, setEmployeeTasks] =  useState<Task[]>([]);
  const [showAttributesModal, setShowAttributesModal] = useState(false);

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/api/employee/${id}/`)
    .then(response => {
        setEmployeeName(`${response.data.first_name} ${response.data.last_name}`);
    })
    .catch(error => {
        console.error('Error fetching employee details:', error);
    });
    axios.get(`http://127.0.0.1:8000/api/employee/${id}/tasks/`)
      .then(response => {
        setEmployeeTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [id]);

  const handleTaskRatingChange = (taskId: number, rating: number) => {
    setEmployeeTasks(employeeTasks.map(task => 
      task.id === taskId ? { ...task, rating } : task
    ));
  };

  const handleSaveTaskRating = (taskId: number) => {
    const task = employeeTasks.find(task => task.id === taskId);
    if (task) {
        axios.post(`http://127.0.0.1:8000/api/task/${taskId}/rate/`, {
            rating: task.rating
        })
            .then(response => {
                console.log('Task Rating saved:', response.data);
                setEmployeeTasks(employeeTasks.filter(task => task.id !== taskId));
            })
            .catch(error => {
                console.error('Error saving task rating:', error);
            });
    }
};

  const handleShowAttributesModal = () => {
    setShowAttributesModal(true);
  };

  const handleCloseAttributesModal = () => {
    setShowAttributesModal(false);
  };

  const handleAttributeRatingChange = (index: number, rating: number) => {
    const newRatings = [...attributeRatings];
    newRatings[index] = rating;
    setAttributeRatings(newRatings);
  };

  const handleSaveAttributeRatings = () => {
    axios.post(`http://127.0.0.1:8000/api/employee/${id}/attributes/`, {
        attributes: attributeRatings
    })
        .then(response => {
            console.log('Attribute Ratings saved:', response.data);
        })
        .catch(error => {
            console.error('Error saving attribute ratings:', error);
        });

    handleCloseAttributesModal();
};

  return (
    <div className="container mt-5">
      <h1>Tasks for {employeeName}</h1>
      <Row>
                {employeeTasks.map(task => (
                    <Col key={task.id} md={4} className="mb-3">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">{task.title}</h5>
                            <p><strong>Description:</strong> {task.description}</p>
                                <p><strong>Time Taken:</strong> {task.time_taken} days</p>
                                <p><strong>Appraisable:</strong> {task.is_appraisable ? 'Yes' : 'No'}</p>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={task.rating}
                                    onChange={(e) => handleTaskRatingChange(task.id, parseInt(e.target.value))}
                                />
                                <Button className="mr-2 mt-3" onClick={() => handleSaveTaskRating(task.id)}>Save Ratings</Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
      <Button onClick={handleShowAttributesModal}>Attributes</Button>
      <Modal show={showAttributesModal} onHide={handleCloseAttributesModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Rate Attributes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {[...Array(10)].map((_, index) => (
                            <Col key={index} md={4} className="mb-3">
                                <p>{attribute_names[index]} </p>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={attributeRatings[index]}
                                    onChange={(e) => handleAttributeRatingChange(index, parseInt(e.target.value))}
                                />
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAttributesModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveAttributeRatings}>Save Ratings</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
};

export default EmployeeDetail;
