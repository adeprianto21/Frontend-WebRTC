import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  let linkItems = (
    <>
      <Nav.Link as={Link} to='/admin/login'>
        Admin Login
      </Nav.Link>
      <Nav.Link as={Link} to='/admin/register'>
        Admin Register
      </Nav.Link>
      <Nav.Link as={Link} to='/user/login'>
        User Login
      </Nav.Link>
      <Nav.Link as={Link} to='/user/register'>
        User Register
      </Nav.Link>
    </>
  );

  if (token && role) {
    if (role === 'Admin') {
      linkItems = (
        <>
          <Nav.Link as={Link} to='/admin/dashboard'>
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to='/admin/dashboard' className='ml-auto'>
            Dashboard
          </Nav.Link>
        </>
      );
    } else {
      linkItems = (
        <Nav.Link as={Link} to='/user/dashboard'>
          Dashboard
        </Nav.Link>
      );
    }
  }

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
            {linkItems}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
