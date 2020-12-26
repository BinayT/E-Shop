import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((el) => {
      return { ...el, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline);
  }
};

const destroyeData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline);
  }
};

process.argv[2] === '-d' ? destroyeData() : importData();
