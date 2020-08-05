import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg='primary' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Apo-Tech
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/user/admin'>
              Admin Login
            </Nav.Link>
            <Nav.Link as={Link} to='/user/login'>
              User Login
            </Nav.Link>
            <Nav.Link as={Link} to='/user/register'>
              User Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
