import * as carsServices from '../services/carsServices.js'
import HttpError from '../helpers/HttpError.js'
import { carAddSchema, carUpdateSchema } from '../schemas/carsSchema.js'
import ctrlWrapper from '../decorators/ctrlWrapper.js'

const getAllCars = async (req, res, next) => {
  try {
    const result = await carsServices.listCars()
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await carsServices.getCarById(id)
    if (!result) {
      throw HttpError(404, `Car with id=${id} not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const addCar = async (req, res, next) => {
  const result = await carsServices.addCar(req.body)
  res.status(201).json(result)
}

const updateCarById = async (req, res, next) => {
  try {
    const { error } = carUpdateSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { id } = req.params
    const result = await carsServices.updateCar(id, req.body)
    if (!result) {
      throw HttpError(404, `Car with id=${id} not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await carsServices.removeCar(id)
    if (!result) {
      throw HttpError(404, `Car with id=${id} not found`)
    }
    // res.status(204).send()
    res.json({ mesage: `Car with id: ${id} was deleted succesful` })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllCars: ctrlWrapper(getAllCars),
  getCarById: ctrlWrapper(getCarById),
  addCar: ctrlWrapper(addCar),
  updateCarById: ctrlWrapper(updateCarById),
  deleteCar: ctrlWrapper(deleteCar)
}