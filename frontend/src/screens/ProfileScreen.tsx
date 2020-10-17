import React, { useEffect, useReducer, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { initialState, reducer } from './common/helper';

export const ProfileScreen: React.FC = ({}) => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: RootStore) => state.userDetails);
  const { userInfo } = useSelector((state: RootStore) => state.userLogin);
  const { success } = useSelector((state: RootStore) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'));
      } else {
        localDispatch({ id: 'name', value: user.name });
        localDispatch({ id: 'email', value: user.email });
      }
    }
  }, [user, userInfo, history]);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword || state.password === '') {
      localDispatch({ id: 'message', value: 'Password do not match' });
    } else {
      dispatch(
        updateUserDetails({
          _id: user?._id,
          name: state.name,
          email: state.email,
          password: state.password
        })
      );
    }
  };
  return (
    <Row>
      <Col md={9}>
        <h2>User Profile</h2>
        {state.message && <Message variant="danger">{state.message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">User profile updated success!</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={state.name}
              onChange={(e) => localDispatch({ id: 'name', value: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={state.email}
              onChange={(e) => localDispatch({ id: 'email', value: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={state.password}
              onChange={(e) => localDispatch({ id: 'password', value: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirmPassword"
              value={state.confirmPassword}
              onChange={(e) =>
                localDispatch({ id: 'confirmPassword', value: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
      </Col>
      <Col md={3}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};
