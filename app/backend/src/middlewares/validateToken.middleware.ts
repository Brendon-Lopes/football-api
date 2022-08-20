import { Request, Response, NextFunction } from 'express';
import statusCodes from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import jwt from '../helpers/jwt';

export default class ValidateToken {
  static validate(req: Request, _res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    if (!token) throw new CustomError(statusCodes.UNAUTHORIZED, 'Token not found');

    jwt.decode(token);

    next();
  }
}
