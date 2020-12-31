import Order from '../models/orderModel.js';

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order Items' });
      return;
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
        user: req.user._id,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { addOrderItems };
