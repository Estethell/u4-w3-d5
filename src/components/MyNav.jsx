import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNav = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to="/">Home</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
