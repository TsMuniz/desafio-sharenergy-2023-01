import { Router } from 'express'
import { CreateClient } from '../Aplication/createClient'
import { DeleteClient } from '../Aplication/deleteClient'
import { FindAllClients } from '../Aplication/findAllClients'
import { FindClient } from '../Aplication/findClient'
import { UpdateClient } from '../Aplication/updateClient'
import { MongoConnection } from '../database/mongoConnection'
import { ClienteRepository } from '../repository/clientRepository'

export const clientRouter = Router()
const mongoClient = new MongoConnection().getClient()
const clientRepository = new ClienteRepository('ShareEnergyDB', mongoClient)
const createClient = new CreateClient(clientRepository)
const findClient = new FindClient(clientRepository)
const findAllClients = new FindAllClients(clientRepository)
const deleteClient = new DeleteClient(clientRepository)
const updateClient = new UpdateClient(clientRepository)

clientRouter.delete('/delete/:id', deleteClient.execute.bind(deleteClient))
clientRouter.patch('/update/:id', updateClient.execute.bind(updateClient))
clientRouter.post('/create', createClient.execute.bind(createClient))
clientRouter.get('/find/:id', findClient.execute.bind(findClient))
clientRouter.get('/findAll', findAllClients.execute.bind(findAllClients))
