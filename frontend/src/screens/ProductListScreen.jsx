import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import Paginate from '../components/Paginate';
import ErrorMessage from '../components/ErrorMessage';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { CREATE_PRODUCT_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success, error: errorDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  console.log(successCreate);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    success,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure you wanna delete ${name}?`)) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus' style={{ color: 'lightgreen' }}></i>
            {'  '}
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}
      {loadingCreate && <Loading />}
      {errorCreate && (
        <ErrorMessage variant='danger'>{errorCreate}</ErrorMessage>
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </Link>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id, product.name)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
