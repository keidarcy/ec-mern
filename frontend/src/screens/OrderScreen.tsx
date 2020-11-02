import React, { useEffect, useState } from 'react';
import { Button, Col, Row, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Message } from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';
import { OrderInitialType, orderPayload } from '../reducers/orderReducers';

interface OrderScreenProps {}

export const OrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const cart = useSelector((state: RootStore) => state.cart);
  const { order, loading, error } = useSelector((state: RootStore) => state.orderDetail);

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  // Calculate prices
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id]);

  return (
    <>
      loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
      <>
        <h1>Order {order?._id}</h1>
      </>
    </>
  );
};
