import React, { useEffect, useReducer } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import { FormContainer } from '../components/FormContainer';
import { initUserState, localUserReducer } from './common/helper';
import { USER_ACTIONS } from '../types';

export const UserEditScreen: React.FC = ({}) => {
  const [state, localDispatch] = useReducer(localUserReducer, initUserState);

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, user } = useSelector((state: RootStore) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    user: userUpdate,
    success: successUpdate
  } = useSelector((state: RootStore) => state.userUpdate);
  const { id: userId } = useParams<{ id: string }>();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ACTIONS.USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        localDispatch({ id: 'isAdmin', value: user?.isAdmin });
        localDispatch({ id: 'name', value: user?.name });
        localDispatch({ id: 'email', value: user?.email });
      }
    }
  }, [history, user, userId, dispatch, successUpdate]);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        email: state.email,
        name: state.name,
        isAdmin: state.isAdmin
      })
    );
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={state.isAdmin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  localDispatch({ id: 'isAdmin', value: e.target.checked })
                }
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
