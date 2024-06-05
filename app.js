import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import morgan from "morgan";
import cors from "cors";

import products from './data/products.js'

import authRouter from './routes/authRouter.js';

import carsRouter from './routes/carsRourer.js';

dotenv.config()
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use('/api/auth', authRouter)
app.use('/api/cars', carsRouter)

app.get('/products', (req, res) => {
  res.json(products)
})

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json(message)
})


const { DB_HOST, PORT = 4000 } = process.env

// app.listen(PORT, () => console.log(`Server run successfull on ${PORT} PORT`))

// mongoose.connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server run successfull on ${PORT} PORT`))
//   })
//   .catch(error => {
//     console.log(error.message)
//     process.exit(1)
//   })

export default app