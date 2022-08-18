import statusCodes from 'http-status-codes';
import ILoginDTO from '../interfaces/ILoginDTO.interface';
import CustomError from '../helpers/CustomError';
import User from '../database/models/user';
import PasswordHandler from '../helpers/PasswordHandler';
import jwt from '../helpers/jwt';

export default class UserService {
  static async findOne(email: string) {
    const user = await User.findOne({ where: { email } });

    if (user === null) {
      throw new CustomError(statusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    return user;
  }

  static async login({ email, password }: ILoginDTO): Promise<string> {
    const user = await UserService.findOne(email);

    PasswordHandler.check(password, user.password);

    const token = jwt.sign({ email, password });

    return token;
  }

  static async validate(token: string | undefined) {
    if (!token) throw new CustomError(statusCodes.BAD_REQUEST, 'Invalid token');

    const { email } = jwt.decode(token);

    const user = await User.findOne({ where: { email } });

    if (user === null) {
      throw new CustomError(statusCodes.NOT_FOUND, 'User not found');
    }

    return user.role;
  }
}
