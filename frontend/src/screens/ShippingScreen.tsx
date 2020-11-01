import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { FormContainer } from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { useHistory } from 'react-router-dom';

export const ShippingScreen: React.FC = ({}) => {
  const { shippingAddress } = useSelector((state: RootStore) => state.cart);
  const [state, setState] = useState(shippingAddress);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress(state));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={state.address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postalCode"
            value={state.postalCode}
            onChange={(e) => setState({ ...state, postalCode: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={state.city}
            onChange={(e) => setState({ ...state, city: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={state.country}
            onChange={(e) => setState({ ...state, country: e.target.value })}
          ></Form.Control>
          <Button type="submit" className="mt-4" variant="primary">
            Contiune
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};
