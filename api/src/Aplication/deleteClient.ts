import { IClientRepository } from '../Domain/Repository/clientRepository'
import CustomError from '../helpers/customError'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

export class DeleteClient {
  constructor (readonly clientRepository: IClientRepository) {
  }

  private validate (id: string): void {
    const isValidObjectId = ObjectId.isValid(id)
    if (!isValidObjectId) throw new CustomError('ID inválido!', 400)
  }

  public async execute (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    this.validate(id)
    const response = await this.clientRepository.delete(id)
    if (response.deletedCount === 0) throw new CustomError('Cliente não encontrado!', 409)

    res.status(200).json({ message: 'sucesso!' })
  }
}
