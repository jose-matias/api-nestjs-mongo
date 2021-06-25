import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({ id: user._id });
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  async comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
