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

export { getProducts, getProductById, deleteProductById };
