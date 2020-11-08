import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { FormContainer } from '../components/FormContainer';
import { initProductState, localProductReducer } from './common/helper';
import { PRODUCT_ACTIONS } from '../types';

export const ProductEditScreen: React.FC = ({}) => {
  const [state, localDispatch] = useReducer(localProductReducer, initProductState);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, product } = useSelector(
    (state: RootStore) => state.productDetails
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    product: productUpdate,
    success: successUpdate
  } = useSelector((state: RootStore) => state.productUpdate);
  const { id: productId } = useParams<{ id: string }>();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_ACTIONS.PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product?.name || product?._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        localDispatch({ id: 'price', value: product?.price });
        localDispatch({ id: 'image', value: product?.image });
        localDispatch({ id: 'name', value: product?.name });
        localDispatch({ id: 'brand', value: product?.brand });
        localDispatch({ id: 'category', value: product?.category });
        localDispatch({ id: 'countInStock', value: product?.countInStock });
        localDispatch({ id: 'description', value: product?.description });
      }
    }
  }, [successUpdate, dispatch, product, productId, history]);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name: state.name,
        price: state.price,
        brand: state.brand,
        image: state.image,
        category: state.category,
        description: state.description,
        countInStock: state.countInStock
      })
    );
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);
      localDispatch({ id: 'image', value: data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
                type="text"
                placeholder="Enter name"
                value={state.name}
                onChange={(e) => localDispatch({ id: 'name', value: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="price"
                value={state.price}
                onChange={(e) => localDispatch({ id: 'price', value: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="image"
                value={state.image}
                onChange={(e) => localDispatch({ id: 'image', value: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.File id="image-file" label="Choose File" custom onChange={handleUpload}>
              {uploading && <Loader />}
            </Form.File>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="brand"
                value={state.brand}
                onChange={(e) => localDispatch({ id: 'brand', value: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="category"
                value={state.category}
                onChange={(e) => localDispatch({ id: 'category', value: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={state.description}
                onChange={(e) =>
                  localDispatch({ id: 'description', value: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="countInStock"
                value={state.countInStock}
                onChange={(e) =>
                  localDispatch({ id: 'countInStock', value: e.target.value })
                }
              ></Form.Control>
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
