import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'User 1',
    email: 'user1@user1.com',
    password: bcrypt.hashSync('user1', 10),
    isAdmin: false,
  },
  {
    name: 'User 2',
    email: 'user2@user2.com',
    password: bcrypt.hashSync('user2', 10),
    isAdmin: false,
  },
];

export default users;
