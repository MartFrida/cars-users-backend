import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const findUser = async (filter) => User.findOne(filter)

export const signup = async (data) => {
  const { password } = data
  const hashPassword = await bcrypt.hash(password, 10)

  return User.create({ ...data, password: hashPassword })
}
