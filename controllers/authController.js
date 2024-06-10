import * as authServices from "../services/authServices.js"
import * as userServices from '../services/userServices.js'
import 'dotenv/config'
import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from '../helpers/HttpError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from "../helpers/sendEmail.js"
import { nanoid } from "nanoid"


const { JWT_SECRET, BASE_URL } = process.env
console.log(JWT_SECRET)

const signup = async (req, res) => {
  const { email } = req.body
  const user = await userServices.findUser({ email })
  if (user) {
    throw HttpError(409, 'Email is already exist')
  }

  const verificationCode = nanoid()

  const newUser = await authServices.signup({ ...req.body, verificationCode })

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`
  }

  await sendEmail(verifyEmail)

  res.status(201).json({
    username: newUser.username,
    email: newUser.email
  })
}

const verify = async (req, res) => {
  const { verificationCode } = req.params
  const user = await userServices.findUser({ verificationCode })
  if (!user) {
    throw HttpError(404, "User not found")
  }
  await userServices.updateUser({ _id: user._id }, { verify: true, verificationCode: "" })

  res.json({
    message: "Verify success"
  })
}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body
  const user = userServices.findUser({ email })

  if (!user) {
    throw HttpError(404, "User not found")
  }

  if (user.verify) {
    throw HttpError(400, "User already verified")
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`
  }

  await sendEmail(verifyEmail)

  res.json({
    message: "Verify email send success"
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await userServices.findUser({ email })
  if (!user) {
    throw HttpError(401, 'Email or password invalid') //Email invalid
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verify')
  }

  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid') //Password invalid
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' })
  await authServices.setToken(user._id, token)

  res.json({
    token,
  })
}

const getCurrent = async (req, res) => {
  console.log(req.user)
  const { email, username } = req.user
  res.json({
    email,
    username
  })
}

const signout = async (req, res) => {
  const { _id } = req.user
  await authServices.setToken(_id)
  res.json({
    message: 'Signout success'
  })
}

export default {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout)
}