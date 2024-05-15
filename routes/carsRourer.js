import cars from '../data/cars.js'
import express from 'express'
import carsController from '../controllers/carsController.js';

const carsRouter = express.Router();
carsRouter.get('/', carsController.getAllCars)

carsRouter.get('/:id', carsController.getCarById)

carsRouter.post('/', carsController.addCar)

carsRouter.put('/', (req, res) => {
  res.json(cars[0])
})

carsRouter.delete('/:id', (req, res) => {
  res.json(cars[0])
})

export default carsRouter;
