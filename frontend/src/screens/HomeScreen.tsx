import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';


export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { error, loading, products } = useSelector(
    (state: RootStore) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts);
  }, [dispatch]);

  return (
    <>
        <h1>YOUR LOVE</h1>
        {loading ? (
          <Loader />
        ): error ? (
          <Message variant="danger">{error}</Message>
        ): (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
    </>
  );
};
