import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({ match }) => {
  const input = match.params.input;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(input, pageNumber));
  }, [dispatch, input, pageNumber]);

  const productsList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productsList;

  return (
    <>
      {!input && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
          <Row>
            {products.length === 0 && (
              <Col sm={12} md={6} lg={4} xl={3}>
                Product Not Found
              </Col>
            )}
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} input={input ? input : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
