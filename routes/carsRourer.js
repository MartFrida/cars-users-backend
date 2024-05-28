import cars from '../data/cars.js'
import express from 'express'
import carsController from '../controllers/carsController.js';
import validateBody from '../helpers/validateBody.js';
import { carAddSchema, carUpdateSchema } from '../schemas/carsSchema.js';
import isValidId from '../middlewares/isValidId.js';
import autenticate from '../middlewares/autenticate.js';

const carsRouter = express.Router();

carsRouter.use(autenticate)

carsRouter.get('/', carsController.getAllCars)

carsRouter.get('/owner', carsController.getCarsByFilter)

carsRouter.get('/:id', isValidId, carsController.getCarById)

carsRouter.post('/', validateBody(carAddSchema), carsController.addCar)

carsRouter.put('/:id', isValidId, validateBody(carUpdateSchema), carsController.updateCarById)

carsRouter.delete('/:id', isValidId, carsController.deleteCar)

export default carsRouter;
