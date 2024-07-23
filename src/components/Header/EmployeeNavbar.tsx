import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import NotificationBell from "./NotificationBell";

export function EmployeeNavBar() {
  return (
    <Navbar
      expand="lg"
      className="border-bottom shadow-sm"
      fixed="top"
      style={{ padding: "0 20px", backgroundColor: "white" }}
    >
      <Container fluid className="d-flex justify-content-between p-0">
        <Navbar.Brand as={Link} to="/employeedashboard/dashboard">
          <img
            src="https://beesheetsv2.beehyv.com/assets/images/logo.png"
            alt="BeeHyv"
            height="50px"
          />
        </Navbar.Brand>
        <Nav className="ml-auto d-flex align-items-center flex-row">
          <Nav className="ml-auto d-flex align-items-center flex-row">
            <NotificationBell />
          </Nav>
          <Nav.Link
            as={Link}
            to="/employeedashboard/profile"
            className="d-flex align-items-center ml-3"
          >
            <span className="icon">
              <img
                src="https://beesheetsv2.beehyv.com/assets/images/Avatar.png"
                alt="profile"
                height="36px"
              />
            </span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
