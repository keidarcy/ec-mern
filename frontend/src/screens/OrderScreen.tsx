import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Message } from '../components/Message';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { Order_Actions } from '../types';

interface OrderScreenProps {}

declare const window: any;

export const OrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const cart = useSelector((state: RootStore) => state.cart);
  const { order, loading, error } = useSelector((state: RootStore) => state.orderDetail);
  const { success: successPay, loading: loadingPay } = useSelector(
    (state: RootStore) => state.orderPay
  );

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  //@ts-expect-error
  const handleSuccessPay = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      if (!order || order._id !== id) {
        dispatch({ type: Order_Actions.ORDER_PAY_RESET });
        dispatch(getOrderDetails(id));
      }
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, id, successPay]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order?._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order?.user?.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order?.shippingAddress.address}, {order?.shippingAddress.city}{' '}
                    {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
                  </p>
                  {order?.isDeliveried ? (
                    <Message variant="success">
                      Deliveried on {order?.deliveriedAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Deliveried</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order?.paymentMethod}
                  </p>
                  {order?.isPaid ? (
                    <Message variant="success">Paid on {order?.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order?.orderItems?.length === 0 ? (
                    <Message>Your order is empty</Message>
                  ) : (
                    <>
                      {order?.orderItems?.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order?.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order?.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order?.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order?.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  {!order?.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order?.totalPrice}
                          onSuccess={handleSuccessPay}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
