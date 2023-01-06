import { IClientRepository } from '../Domain/Repository/clientRepository'
import CustomError from '../helpers/customError'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { IClient } from '../Domain/Entities/Client'

export class FindClient {
  constructor (readonly clientRepository: IClientRepository) {
  }

  private validate (id: string): void {
    const isValidObjectId = ObjectId.isValid(id)
    if (!isValidObjectId) throw new CustomError('ID inválido!', 400)
  }

  public async execute (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    this.validate(id)
    const client: IClient = await this.clientRepository.readById(id)
    const { _id, ...rest } = client
    res.status(200).json({
      client: {
        id: _id?.toHexString(),
        ...rest
      }
    })
  }
}
