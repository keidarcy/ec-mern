import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Rating } from '../components/Rating';
import { RootStore } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

interface ProductScreenProps {
  match: {
    params: {
      id: string;
    };
  };
}

export const ProductScreen: React.FC<ProductScreenProps> = ({ match }) => {
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootStore) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product?.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating as number}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {(product?.countInStock as number) > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setQty(+e.target.value)
                        }
                      >
                        {[...Array(product?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  disabled={(product?.countInStock as number) < 1}
                  type="button"
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
