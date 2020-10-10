import express from 'express';
import 'colors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

dotenv.config();
connectDB();

const app = express();

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);
