import cars from '../data/cars.js'
import express from 'express'
import carsController from '../controllers/carsController.js';

const carsRouter = express.Router();
carsRouter.get('/', carsController.getAllCars)

carsRouter.get('/:id', carsController.getCarById)

carsRouter.post('/', carsController.addCar)

carsRouter.put('/', carsController.updateCarById)

carsRouter.delete('/:id', carsController.deleteCar)

export default carsRouter;
