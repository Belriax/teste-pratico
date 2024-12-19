import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return false;
    }

    const token = authorizationHeader.split(' ')[1]; // Remove "Bearer " do token

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Salva os dados do token no objeto de requisição
      return true;
    } catch (error) {
      return error;
    }
  }
}
