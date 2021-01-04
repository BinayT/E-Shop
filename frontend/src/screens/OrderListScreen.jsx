import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history]);

  /* const deleteHandler = (id) => {
    if (window.confirm('Are you sure you wanna delete this order?')) {
      dispatch(deleteUser(id));
    }
  }; */

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage variant='danger'>{error}</ErrorMessage>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.deliveredAt ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link
                      className='btn-sm light btn btn-primary'
                      to={`/order/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
