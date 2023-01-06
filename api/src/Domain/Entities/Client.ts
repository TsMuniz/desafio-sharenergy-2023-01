import { ObjectId } from 'mongodb'

export interface Address {
  street: string
  city: string
  state: string
  zipcode: string
  country: string
}

export interface IClient {
  id?: string
  _id?: ObjectId
  name: string
  email: string
  address: Address
  phoneNumber: string
  cpf: string
}

export class Client {
  name: string
  email: string
  address: Address
  phoneNumber: string
  cpf: string

  constructor (client: IClient) {
    const { name, email, address, phoneNumber, cpf } = client
    this.name = name
    this.email = email
    this.address = address
    this.phoneNumber = phoneNumber
    this.cpf = cpf
  }
}
