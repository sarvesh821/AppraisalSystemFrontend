
import React, { useState, useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


const tasks = [
  { id: 1, employeeId: 1, description: 'Task 1', rating: 0 },
  { id: 2, employeeId: 1, description: 'Task 2', rating: 0 },
  { id: 3, employeeId: 1, description: 'Task 3', rating: 0 },
  { id: 4, employeeId: 1, description: 'Task 4', rating: 0 },
  { id: 5, employeeId: 1, description: 'Task 5', rating: 0 },
  { id: 6, employeeId: 1, description: 'Task 6', rating: 0 },
  { id: 7, employeeId: 2, description: 'Task 7', rating: 0 },
 
];

const EmployeeDetail = () => {
  const { id } = useParams();
//   const history = useHistory();
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [showAttributesModal, setShowAttributesModal] = useState(false);

  useEffect(() => {
    setEmployeeTasks(tasks.filter(task => task.employeeId === parseInt(id)));
  }, [id]);

  const handleTaskRatingChange = (taskId: any, rating: number) => {
    setEmployeeTasks(employeeTasks.map(task => 
      task.id === taskId ? { ...task, rating } : task
    ));
  };

  const handleSaveRatings = () => {
   
    console.log('Task Ratings:', employeeTasks);
    
    history.push('/admindashboard/rating');
  };

  const handleShowAttributesModal = () => {
    setShowAttributesModal(true);
  };

  const handleCloseAttributesModal = () => {
    setShowAttributesModal(false);
  };

  const handleAttributeRatingChange = (attributeIndex: number, rating: number) => {
    
    console.log(`Attribute ${attributeIndex + 1} Rating:`, rating);
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
            <Button onClick={handleSaveRatings} className="mr-2">Save Ratings</Button>
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
