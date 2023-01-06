import { Router } from 'express'
import { CreateClient } from '../Aplication/createClient'
import { MongoConnection } from '../database/mongoConnection'
import { ClienteRepository } from '../repository/clientRepository'

export const clientRouter = Router()
const mongoClient = new MongoConnection().getClient()
const clientRepository = new ClienteRepository('ShareEnergyDB', mongoClient)
const createClient = new CreateClient(clientRepository)

clientRouter.post('/create', createClient.execute.bind(createClient))