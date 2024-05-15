import * as carsServices from '../services/carsServices.js'
import HttpError from '../helpers/HttpError.js'

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
  try {
    const result = await carsServices.addCar(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllCars,
  getCarById,
  addCar
}