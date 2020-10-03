import express from 'express';
import products from './data/products';
import 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  // console.log(req);
  res.send('RUNININIGNGI');
});

app.get('/api/products', (req, res) => {
  // console.log(req);
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);
