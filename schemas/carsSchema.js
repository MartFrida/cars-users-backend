import Joi from "joi";

export const carAddSchema = Joi.object({
  make: Joi.string().valid("Lincoln",
    "Bentley",
    "Aston Martin",
    "Pontiac",
    "Lamborghini",).required(),
  // make: Joi.string(),
  // model: Joi.string(),
  // type: Joi.string(),
  model: Joi.string().required(),
  // fuelConsumption: Joi.string(),
  // engineSize: Joi.string(),
  rentalPrice: Joi.string().required(),
})

export const carUpdateSchema = Joi.object({
  make: Joi.string().valid("Lincoln",
    "Bentley",
    "Aston Martin",
    "Pontiac",
    "Lamborghini",),
  model: Joi.string(),
  rentalPrice: Joi.string(),
})

// {
//   "engineSize": "5.4L V8",
//     "accessories": [
//       "Premium leather seats",
//       "THX II Certified audio system",
//       "Power-deployable running boards"
//     ],
//       "functionalities": [
//         "AdvanceTrac with Roll Stability Control",
//         "Voice-Activated Navigation System",
//         "Power liftgate"
//       ],
//         "rentalPrice": "$50",
//           "rentalCompany": "Elite Car Rentals",
//             "address": "123 Example Boulevard, Kharkiv, Ukraine",
//               "rentalConditions": "Minimum age: 25\nValid driver's license\nInsurance coverage required",
//                 "mileage": 6173
// }