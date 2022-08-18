import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../schemas/loginValidation.schema';
import CustomError from '../helpers/CustomError';

export default class Validate {
  static login(req: Request, _res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);

    if (error) throw new CustomError(StatusCodes.BAD_REQUEST, error.message);

    next();
  }
}
