import { MongoClient } from 'mongodb'
import { MongoConnection } from '../database/mongoConnection'
import { IUser } from '../Domain/Entities/User'

const mongoClient: MongoClient = new MongoConnection().getClient()

export async function addUser (name: string, email: string, password: string): Promise<Object> {
  const ShareEnergyDB = mongoClient.db('ShareEnergy')
  const user = {
    name,
    email,
    password
  }

  const bb = await ShareEnergyDB.collection('Users').insertOne(user)
  return bb
}

// seedUser('thiago', 'ts_muniz@outlook.com', '12345679')
//   .then((response) => console.log(response))
//   .catch((err) => console.log(err))

// seedUser('maria', 'maria_muniz@outlook.com', '1234645/')
//   .then((response) => console.log(response))
//   .catch((err) => console.log(err))

// async function readByEmail (email: string): Promise<IUser[]> {
//   const ShareEnergyDB = mongoClient.db('ShareEnergy')
//   const result: IUser[] = []
//   await ShareEnergyDB.collection('Users').find().forEach((doc) => {
//     const { _id, name, email, password } = doc
//     result.push({ id: _id.toHexString(), name, email, password })
//   })
//   return result
// }

async function readOne (input: string): Promise<IUser> {
  const ShareEnergyDB = mongoClient.db('ShareEnergy')
  const result = await ShareEnergyDB.collection('Users').findOne({ email: input })
  const { _id, name, email, password } = result as unknown as IUser
  return { id: _id?.toHexString(), name, email, password }
}

readOne('maria_muniz@outlook.com')
  .then((response) => console.log('21', response))
  .catch((err) => console.log(err))
