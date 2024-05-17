// import fs from 'fs/promises'
// import { nanoid } from 'nanoid'
// import path from 'path'
import Car from '../models/Car.js'

// const carsPath = path.resolve('data', 'dbcars.json')
// const updateCars = cars => fs.writeFile(carsPath, JSON.stringify(cars, null, 2))

export const listCars = () => Car.find()

export async function getCarById(carId) {
  // const cars = await listCars()
  // const result = cars.find(item => item._id.$oid === carId)
  // return result || null
}

export async function removeCar(carId) {
  // const cars = await listCars()
  // const index = cars.findIndex(item => item._id.$oid === carId)
  // if (index === -1) {
  //   return null
  // }
  // const [result] = cars.splice(index, 1)
  // await updateCars(cars)
  // return result
}

export const addCar = async (data) => Car.create(data)

export async function updateCar(id, data) {
  // const cars = await listCars()
  // const index = cars.findIndex(item => item._id.$oid === id)
  // if (index === -1) {
  //   return null
  // }

  // cars[index] = { ...cars[index], ...data }
  // await updateCars(cars)
  // return cars[index]
}