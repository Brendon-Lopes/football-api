import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import ILoginDTO from '../interfaces/ILoginDTO.interface';
import CustomError from './CustomError';

export default class JWT {
  static sign(payload: ILoginDTO): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret');
  }

  static decode(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return data as ILoginDTO;
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
      }
    }
    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return data as ILoginDTO;
  }
}
