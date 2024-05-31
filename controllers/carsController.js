import * as carsServices from '../services/carsServices.js'
import HttpError from '../helpers/HttpError.js'
import { carAddSchema, carUpdateSchema } from '../schemas/carsSchema.js'
import ctrlWrapper from '../decorators/ctrlWrapper.js'
import fs from 'fs/promises'
import path from 'path'

const carsDir = path.resolve('public', 'cars')

const getAllCars = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  try {
    const result = await carsServices.listCars({ skip, limit })
    const total = await carsServices.getCarsCount()
    res.json({ total, result })
  } catch (error) {
    next(error)
  }
}

const getCarsByFilter = async (req, res, next) => {
  try {
    const { _id: owner } = req.user
    const result = await carsServices.getCarsByFilter({ owner })
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
  const { path: oldPath, filename } = req.file
  const newPath = path.join(carsDir, filename)
  await fs.rename(oldPath, newPath)
  const { _id: owner } = req.user
  const photo = path.join("cars", filename)
  const result = await carsServices.addCar({ ...req.body, photo, owner })
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
  getCarsByFilter: ctrlWrapper(getCarsByFilter),
  getCarById: ctrlWrapper(getCarById),
  addCar: ctrlWrapper(addCar),
  updateCarById: ctrlWrapper(updateCarById),
  deleteCar: ctrlWrapper(deleteCar)
}