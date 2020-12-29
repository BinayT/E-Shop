import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
  };

  const dispatch = useDispatch();

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
