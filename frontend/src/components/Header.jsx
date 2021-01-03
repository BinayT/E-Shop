import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { logout } from '../actions/userActions';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.pushState('/');
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/' className='navbar-brand'>
            E-Shop
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Link to='/cart' className='nav-link mr-3'>
                <i className='fas fa-shopping-cart' /> Cart
              </Link>
              {!userInfo ? (
                <Link to='/login' className='nav-link'>
                  <i className='fas fa-user' /> Sign In
                </Link>
              ) : (
                <NavDropdown title={userInfo.name} id='username'>
                  <Link to='/profile' style={{ textDecoration: 'none' }}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin Panel' id='adminmenu'>
                  <Link to='/admin/userlist' style={{ textDecoration: 'none' }}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </Link>
                  <Link
                    to='/admin/productlist'
                    style={{ textDecoration: 'none' }}
                  >
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </Link>
                  <Link
                    to='/admin/orderlist'
                    style={{ textDecoration: 'none' }}
                  >
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
