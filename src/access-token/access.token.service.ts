import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async createToken(payload: string): Promise<string> {
    return this.jwtService.signAsync({ sub: payload });
  }
}
