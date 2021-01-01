import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        res.status(401);
        res.json({
          message: 'Not Authorized. Token probably expired or wrong.',
        });
      }
    } else {
      throw new Error('Not Authorized. Bearer token is missing');
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default protect;
