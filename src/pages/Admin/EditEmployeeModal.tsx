import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  date_of_joining: string;
  date_of_birth: string;
  location: string;
  email: string;
  contact_no: string;
  designation: string;
}

interface EditEmployeeModalProps {
  show: boolean;
  handleClose: () => void;
  employee: Employee | null;
  onSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  show,
  handleClose,
  employee,
  onSave,
}) => {
  const [formData, setFormData] = useState<Employee | null>(employee);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      axios
        .put(`http://127.0.0.1:8000/api/employees/${formData.id}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          onSave(response.data);
          handleClose();
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={formData?.first_name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={formData?.last_name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={formData?.designation || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDateOfbirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  value={formData?.date_of_birth || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDateOfJoining">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_joining"
                  value={formData?.date_of_joining || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData?.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formContactNo">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_no"
                  value={formData?.contact_no || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData?.location || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;
