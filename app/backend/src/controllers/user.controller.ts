import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });
    return res.status(statusCodes.OK).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const { authorization: token } = req.headers;

    const role = await UserService.validate(token);

    return res.status(statusCodes.OK).json({ role });
  }
}
