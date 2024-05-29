import cars from '../data/cars.js'
import express from 'express'
import carsController from '../controllers/carsController.js';
import validateBody from '../helpers/validateBody.js';
import { carAddSchema, carUpdateSchema } from '../schemas/carsSchema.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const carsRouter = express.Router();

carsRouter.use(authenticate)

carsRouter.get('/', carsController.getAllCars)

carsRouter.get('/owner', carsController.getCarsByFilter)

carsRouter.get('/:id', isValidId, carsController.getCarById)

// upload.fields([{name:'photo',maxCount:1}])
// upload.array('photo',8)
carsRouter.post('/', upload.single('photo'), validateBody(carAddSchema), carsController.addCar)

carsRouter.put('/:id', isValidId, validateBody(carUpdateSchema), carsController.updateCarById)

carsRouter.delete('/:id', isValidId, carsController.deleteCar)

export default carsRouter;
