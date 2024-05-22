import User from '../models/User.js'

export const findUser = async (filter) => User.findOne(filter)

export const findUserById = async (id) => User.findById(id)
