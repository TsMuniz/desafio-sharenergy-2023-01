import { IClientRepository } from '../Domain/Repository/clientRepository'
import { Request, Response } from 'express'
import { IClient } from '../Domain/Entities/Client'

export class FindAllClients {
  constructor (readonly clientRepository: IClientRepository) {
  }

  public async execute (_req: Request, res: Response): Promise<void> {
    const clients: IClient[] = await this.clientRepository.getAll()
    res.status(200).json(clients)
  }
}
