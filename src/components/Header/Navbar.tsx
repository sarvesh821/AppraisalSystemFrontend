import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
export function NavBar() {
    return (
        <Navbar expand="lg" className="border-bottom shadow-sm" fixed="top" style={{ padding: '0 20px', backgroundColor: "white" }}>
            <Container fluid className="d-flex justify-content-between p-0">
                <Navbar.Brand href="#">
                    <img 
                        src="https://beesheetsv2.beehyv.com/assets/images/logo.png" 
                        alt="BeeHyv" 
                        height="50px" 
                    />
                </Navbar.Brand>
                <Nav className="ml-auto d-flex align-items-center flex-row">
                    <Nav.Link href="#" className="d-flex align-items-center">
                    <FaBell size={22} color="grey"/>
                    </Nav.Link>
                    <Nav.Link href="#" className="d-flex align-items-center ml-3">
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
