import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class JWT {
  static sign(payload: { email: string, password: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret');
  }

  static decode(token: string) {
    const validation = jwt.decode(token);
    return validation;
  }
}
