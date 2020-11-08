import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { deleteProduct, listProducts, createProduct } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { PRODUCT_ACTIONS } from '../types';
import { Paginate } from '../components/Paginate';

export const ProductListScreen: React.FC = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, products } = useSelector(
    (state: RootStore) => state.productList
  );

  const { pageNumber } = useParams<{ pageNumber: string }>();

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = useSelector((state: RootStore) => state.productDelete);

  const { userInfo } = useSelector((state: RootStore) => state.userLogin);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: productCreate
  } = useSelector((state: RootStore) => state.productCreate);

  useEffect(() => {
    dispatch({ type: PRODUCT_ACTIONS.PRODUCT_CREATE_RESET });
    if (!userInfo?.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${productCreate?._id}`);
    } else {
      dispatch(listProducts('', pageNumber || '1'));
    }
  }, [pageNumber, dispatch, history, successDelete, successCreate, productCreate]);

  const handleDelete = (id: string) => {
    if (window.confirm('SURE ?')) dispatch(deleteProduct(id));
  };

  const handleProductCreate = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={handleProductCreate}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={products?.pages || 1}
            page={products?.page || 1}
            isAdmin={userInfo?.isAdmin || true}
            keyword=""
          />
        </>
      )}
    </>
  );
};
