import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserProfile = async (req, res) => {
  res.send('success');
};

export { authUser, getUserProfile };
