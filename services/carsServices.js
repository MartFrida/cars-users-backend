import fs from 'fs/promises'
import { nanoid } from 'nanoid'
import path from 'path'


const carsPath = path.resolve('data', 'dbcars.json')
const updateCars = cars => fs.writeFile(carsPath, JSON.stringify(cars, null, 2))

export async function listCars() {
  const data = await fs.readFile(carsPath, "utf-8")
  return JSON.parse(data)
}

export async function getCarById(carId) {
  const cars = await listCars()
  const result = cars.find(item => item._id.$oid === carId)
  return result || null
}

export async function removeCar(carId) {
  const cars = await listCars()
  const index = cars.findIndex(item => item._id.$oid === carId)
  if (index === -1) {
    return null
  }
  const [result] = cars.splice(index, 1)
  await updateCars(cars)
  return result
}

export async function addCar(data) {
  const { make, model, rentalPrice } = data
  const cars = await listCars()

  const newContact = {
    _id: {
      $oid: nanoid()
    },
    ...data,
  }

  cars.push(newContact)
  await updateCars(cars)
  return newContact
}

export async function updateCar(id, data) {
  const cars = await listCars()
  const index = cars.findIndex(item => item._id.$oid === id)
  if (index === -1) {
    return null
  }

  cars[index] = { ...cars[index], ...data }
  await updateCars(cars)
  return cars[index]
}