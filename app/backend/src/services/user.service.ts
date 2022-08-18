import statusCodes from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import User from '../database/models/user';
import PasswordHandler from '../helpers/PasswordHandler';
import jwt from '../helpers/jwt';

export default class UserService {
  static async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user === null) throw new CustomError(statusCodes.NOT_FOUND, 'Invalid fields');

    PasswordHandler.check(password, user.password);

    const token = jwt.sign({ email, password });

    return token;
  }
}
