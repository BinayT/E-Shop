import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';

const UserEditScreen = ({ location, history, match }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user._id, user.name, dispatch, user.email, user.isAdmin, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link className='btn btn-dark my-3 gobackbutton' to='/admin/userlist'>
        <i className='far fa-hand-point-left' /> Go back
      </Link>
      <FormContainer>
        <h1>Edit User: {user.name}</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage variant='danger'>{error}</ErrorMessage>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                maxLength='10'
                type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
