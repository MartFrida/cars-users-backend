import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const app = express();

const { DB_HOST, PORT = 4000 } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Server run successfull on 4000 PORT"))
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

