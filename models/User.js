import { Schema, model, version } from "mongoose";
import { handleSaveError, setUpdateSetting } from '../models/hooks.js'
import { emailRegexp } from "../constants/regexp.js";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    match: emailRegexp,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  token: {
    type: String,
  }
}, { version: false, timestamps: true })

userSchema.post('save', handleSaveError)
userSchema.pre('findOneAndUpdate', setUpdateSetting)
userSchema.post('findOneAndUpdate', handleSaveError)

const User = model('user', userSchema)
export default User;