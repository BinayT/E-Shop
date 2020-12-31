import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ history, match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    //Calculate Prices.
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onLoad = () => setSdkReady(true);
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage variant='danger'>error</ErrorMessage>
  ) : (
    <>
      <h1>OrderID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <span className='mr-2'>
                <strong>Name: </strong>
                {order.user.name}
              </span>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <ErrorMessage variant='success'>
                  Delivered at: {order.deliveredAt}
                </ErrorMessage>
              ) : (
                <ErrorMessage variant='danger'>Not delivered Yet</ErrorMessage>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <ErrorMessage variant='success'>
                  Paid on: {order.paidAt}
                </ErrorMessage>
              ) : (
                <ErrorMessage variant='danger'>Not paid Yet</ErrorMessage>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <ErrorMessage>Order is empty</ErrorMessage>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((el, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image src={el.image} alt={el.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${el.product}`}>{el.name}</Link>
                        </Col>
                        <Col md={4}>
                          {el.qty} x {el.price} = ${el.qty * el.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>Order Summary:</ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>$ {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
