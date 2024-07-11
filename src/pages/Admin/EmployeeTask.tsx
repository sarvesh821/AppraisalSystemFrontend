
import React, { useState, useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface Task {
    id: number;
    description: string;
    rating:number;
  }


const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [attributeRatings, setAttributeRatings] = useState(Array(10).fill(0));
  const [employeeTasks, setEmployeeTasks] =  useState<Task[]>([]);
  const [showAttributesModal, setShowAttributesModal] = useState(false);

  useEffect(() => {
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

    console.log('Attribute Ratings saved');
    handleCloseAttributesModal();
  };

  return (
    <div className="container mt-5">
      <h1>Tasks for Employee {id}</h1>
      <Row>
        {employeeTasks.map(task => (
          <Col key={task.id} md={4} className="mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.description}</h5>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  value={task.rating}
                  onChange={(e) => handleTaskRatingChange(task.id, parseInt(e.target.value))}
                />
            <Button  className="mr-2 mt-3">Save Ratings</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Button onClick={handleShowAttributesModal}>Attributes</Button>
      <Modal show={showAttributesModal} onHide={handleCloseAttributesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Attributes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {[...Array(10)].map((_, index) => (
              <Col key={index} md={4} className="mb-3">
                <p>Attribute {index + 1}</p>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
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
