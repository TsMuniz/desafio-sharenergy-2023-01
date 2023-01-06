import { Router } from 'express'
import { Login } from '../Aplication/Login'
import { MongoConnection } from '../database/mongoConnection'
import { UserRepository } from '../repository/userRepository'

export const loginRouter = Router()
const mongoClient = new MongoConnection().getClient()
const repository = new UserRepository('ShareEnergyDB', mongoClient)
const login = new Login(repository)

loginRouter.post('/', login.execute.bind(login))
loginRouter.put('/access')
loginRouter.put('/changeAccess')
