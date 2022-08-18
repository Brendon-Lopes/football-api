import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/CustomError';

class GlobalErrorHandler {
  defaultStatus: number;

  constructor(defaultStatus = StatusCodes.INTERNAL_SERVER_ERROR) {
    this.defaultStatus = defaultStatus;
  }

  handle(error: Error, req: Request, res: Response, _next: NextFunction) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(this.defaultStatus).json({ message: error.message });
  }
}

const globalErrorHandler = new GlobalErrorHandler();

export default globalErrorHandler;
