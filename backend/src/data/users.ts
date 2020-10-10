import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'TRUMP',
    email: 'trump@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'JOE',
    email: 'joe@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

export default users;
