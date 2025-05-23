import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { IPasswordHasher } from '../interfaces/i-password-service';

@injectable()
export class PasswordHasher implements IPasswordHasher{
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}