import User from '../models/User.js'

export const findUser = async (filter) => User.findOne(filter)

export const signup = async (data) => User.create(data)
