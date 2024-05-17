import { Schema, model } from "mongoose";

const carSchema = new Schema({
  make: {
    type: String,
    enum: ["Buick",
      "Volvo",
      "HUMMER",
      "Subaru",
      "Mitsubishi",
      "Nissan",
      "Lincoln",
      "GMC",
      "Hyundai",
      "MINI",
      "Bentley",
      "Mercedes",
      "Aston Martin",
      "Pontiac",
      "Lamborghini",
      "Audi",
      "BMW",
      "Chevrolet",
      "Chrysler",
      "Kia",
      "Land"],
    required: true,
  },
  rentalPrice: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true })

const Car = model('car', carSchema)

export default Car;