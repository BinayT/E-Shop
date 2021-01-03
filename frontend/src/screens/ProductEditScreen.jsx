import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';
import { listProduct, updateProduct } from '../actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ location, history, match }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productItem);
  const { loading, error, product } = productItem;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    product: updatedProduct,
    success,
  } = productUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setDescription(product.description);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [productId, dispatch, history, product, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    //UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        description,
        category,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-dark my-3 gobackbutton' to='/admin/productlist'>
        <i className='far fa-hand-point-left' /> Go back
      </Link>
      <FormContainer>
        <h1>Edit Product: {product.name}</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && (
          <ErrorMessage variant='danger'>{errorUpdate}</ErrorMessage>
        )}
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage variant='danger'>{error}</ErrorMessage>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Brand'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
