import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNav = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link className="navLink mx-3" to="/">
            Home
          </Link>
          <Link className="navLink mx-3" to="/form">
            Crea un nuovo post!
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
