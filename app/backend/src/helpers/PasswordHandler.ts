import * as bcryptjs from 'bcryptjs';
import CustomError from './CustomError';

export default class PasswordHandler {
  static encrypt(password: string) {
    const salt = bcryptjs.genSaltSync(10);
    const encryptedPassword = bcryptjs.hashSync(password, salt);
    return encryptedPassword;
  }

  static check(password: string, passwordDb: string): void {
    const match = bcryptjs
      .compareSync(password, passwordDb) || password === passwordDb;

    if (!match) {
      throw new CustomError(400, 'Invalid fields');
    }
  }
}
