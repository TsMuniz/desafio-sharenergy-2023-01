import { IClientRepository } from '../Domain/Repository/clientRepository'
import Joi from 'joi'
import CustomError from '../helpers/customError'
import { Address, Client } from '../Domain/Entities/Client'
import { Request, Response } from 'express'

export class CreateClient {
  constructor (readonly clientRepository: IClientRepository) {
  }

  private async validate (
    name: string,
    phoneNumber: string,
    email: string,
    cpf: string,
    address: Address
  ): Promise<Object | Error> {
    const schema = Joi.object({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().length(11).required(),
      address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipcode: Joi.string().required(),
        country: Joi.string().required()
      }).required()
    })
    const { error, value } = schema.validate({ name, phoneNumber, email, cpf, address })
    if (error) throw new CustomError(error.message, 400)
    return value
  }

  async execute (req: Request, res: Response): Promise<void> {
    const { name, phoneNumber, cpf, address, email } = req.body
    await this.validate(name, phoneNumber, email, cpf, address)

    const client = new Client({
      name,
      phoneNumber,
      email,
      cpf,
      address
    })
    const response = await this.clientRepository.create(client)

    res.status(200).json({ response })
  }
}
