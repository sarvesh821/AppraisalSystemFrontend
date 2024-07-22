import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";




export function AdminNavBar() {
  
  return (
    <Navbar
      expand="lg"
      className="border-bottom shadow-sm"
      fixed="top"
      style={{ padding: "0 20px", backgroundColor: "white" }}
    >
      <Container fluid className="d-flex justify-content-between p-0">
        <Navbar.Brand as={Link} to="/admindashboard/dashboard">
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
        </Nav>
      </Container>
    </Navbar>
  );
}
