// import fs from 'fs/promises'
// import { nanoid } from 'nanoid'
// import path from 'path'
import Car from '../models/Car.js'

// const carsPath = path.resolve('data', 'dbcars.json')
// const updateCars = cars => fs.writeFile(carsPath, JSON.stringify(cars, null, 2))

export const listCars = () => Car.find()

export const getCarsByFilter = (filter) => Car.find(filter, '-createdAt, -updatedAt')

export const getCarById = (carId) => Car.findById(carId)

export const removeCar = (carId) => Car.findByIdAndDelete(carId)

export const addCar = async (data) => Car.create(data)

export const updateCar = (id, data) => Car.findByIdAndUpdate(id, data)