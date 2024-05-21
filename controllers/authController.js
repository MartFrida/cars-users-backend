import * as authServices from "../services/authServices.js"
import 'dotenv/config'
import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from '../helpers/HttpError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env
console.log(JWT_SECRET)

const signup = async (req, res) => {
  const { email } = req.body
  const user = await authServices.findUser({ email })
  if (user) {
    throw HttpError(409, 'Email is already exist')
  }

  const newUser = await authServices.signup(req.body)

  res.status(201).json({
    username: newUser.username,
    email: newUser.email
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await authServices.findUser({ email })
  if (!user) {
    throw HttpError(401, 'Email or password invalid') //Email invalid
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid') //Password invalid
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' })

  res.json({
    token,
  })
}

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin)
}