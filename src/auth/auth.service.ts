import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return { message: 'Usuário criado com sucesso!' };
  }

  async signin(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user || user.password !== loginUserDto.password) {
      throw new UnauthorizedException('Usuário ou senha incorreto.');
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findById(id: number): Promise<User> {
    if (!id || id <= 0) {
      throw new BadRequestException('ID do usuário inválido.');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID ${id} do usuário não encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email || !this.isValidEmail(email)) {
      throw new BadRequestException(
        'E-mail inválido, utilize um email válido.',
      );
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`E-mail ${email} do usário não encontrado.`);
    }
    return user;
  }

  async updateUserBalance(userId: number, newBalance: number): Promise<User> {
    if (newBalance < 0) {
      throw new BadRequestException('O valor não pode ser negativo.');
    }

    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    try {
      user.balance = newBalance;
      return await this.userRepository.save(user);
    } catch (error) {
      return error;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
