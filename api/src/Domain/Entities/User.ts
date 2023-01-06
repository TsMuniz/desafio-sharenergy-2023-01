import { ObjectId } from 'mongodb'

export interface IUser {
  id?: string
  _id?: ObjectId
  name: string
  password: string
}

export class User {
  name: string
  password: string

  constructor (client: IUser) {
    const { name, password } = client
    this.name = name
    this.password = password
  }
}
