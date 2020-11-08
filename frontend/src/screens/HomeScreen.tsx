import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate';

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams<{ keyword: string }>();
  const { pageNumber } = useParams<{ pageNumber: string }>();

  const { error, loading, products } = useSelector(
    (state: RootStore) => state.productList
  );

  useEffect(() => {
    console.log(products);
    dispatch(listProducts(keyword, pageNumber || '1'));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>YOUR LOVE</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products?.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={products?.pages || 1}
            page={products?.page || 1}
            keyword={keyword}
            isAdmin={false}
          />
        </>
      )}
    </>
  );
};
