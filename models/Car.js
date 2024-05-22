import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const carSchema = new Schema({
  make: {
    type: String,
    enum: [
      "Lincoln",
      "Bentley",
      "Aston Martin",
      "Pontiac",
      "Lamborghini",
    ],
    required: true,
  },
  rentalPrice: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, { versionKey: false, timestamps: true })

carSchema.post('save', handleSaveError)

carSchema.pre('findOneAndUpdate', setUpdateSetting)

carSchema.post('findOneAndUpdate', handleSaveError)

const Car = model('car', carSchema)

export default Car;