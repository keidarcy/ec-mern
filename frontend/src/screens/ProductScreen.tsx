import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Rating } from '../components/Rating';
import { RootStore } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { PRODUCT_ACTIONS } from '../types';

interface ProductScreenProps {
  match: {
    params: {
      id: string;
    };
  };
}

export const ProductScreen: React.FC<ProductScreenProps> = ({ match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootStore) => state.productDetails
  );
  const { userInfo } = useSelector((state: RootStore) => state.userLogin);
  const { success: successProductReview, error: errorProductReview } = useSelector(
    (state: RootStore) => state.productReviewCreate
  );

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
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
        <>
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
                      {(product?.countInStock as number) > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product?.reviews && product?.reviews.length === 0 ? (
                <Message>No Review</Message>
              ) : (
                <ListGroup.Item variant="flush">
                  {product?.reviews?.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review?.name}</strong>
                      <Rating value={review.rating} text={review.rating.toString()} />
                      <p>{review?.createdAt?.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setRating(Number(e.target.value))
                        }
                      >
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'].map(
                          (des, index) => (
                            <option value={index} key={index}>
                              {index ? `${index} - ${des}` : 'Select...'}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setComment(e.target.value)
                        }
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
