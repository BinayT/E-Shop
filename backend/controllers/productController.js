import Product from '../models/productModel.js';

const getProducts = async (_, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Product not found', error: `Error: ${error.message}` });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Product not found', error: `Error: ${error.message}` });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(404).json({ message: `Error: ${error.message}` });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;
    const product = await Product.findById(req.params.id);
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Product Not found', error: `Error: ${error.message}` });
  }
};

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
};
