import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3'>
      <Link href={`/products/${product.id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='mb-1'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color='#f8e825'
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
