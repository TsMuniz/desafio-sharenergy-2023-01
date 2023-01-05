/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IUser } from '../Domain/Entities/User'
import { IUserRepository } from '../Domain/Repository/userRepository'
import 'dotenv/config'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import CustomError from '../helpers/customError'

const secret: string = process.env.JWT_SECRET || 'fgdfgsdfghsh3132154654'

export class Login {
  constructor (readonly userRepository: IUserRepository) {
  }

  private async getUserByEmail (email: string): Promise<IUser> {
    const user = await this.userRepository.readByEmail(email)
    return user
  }

  private async createToken (user: IUser): Promise<string> {
    const { password, email } = user
    const payload = { data: { email, password } }
    const token = sign(payload, secret)
    return token
  }

  private async checkEmailAndPassword (email: string, password: string): Promise<string | Error> {
    const user = await this.getUserByEmail(email)
    const { email: userEmail, password: userPassword } = user
    if (
      userEmail === email &&
      password === userPassword
    ) {
      return await this.createToken(user)
    }
    throw new CustomError('Usuário não cadastrado.', 404)
  }

  public async execute (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    const token = await this.checkEmailAndPassword(email, password)
    res.status(200).json({ token })
  }
}
