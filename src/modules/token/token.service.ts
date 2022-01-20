/** @packages */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';

/** @imports */
import { Token, User } from '@database/entities';

/** @module */
import { CreateTokenDto } from './dto';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private readonly _tokenRepository: TokenRepository,
  ) {}
  async findAll(user: User, status = 'ACTIVE'): Promise<Token[]> {
    const tokens: Token[] = await this._tokenRepository.find({
      where: { status, user },
    });

    if (!tokens) {
      throw new NotFoundException();
    }

    return plainToInstance(Token, tokens);
  }

  async findOne(id: number, user: User): Promise<Token> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const token: Token = await this._tokenRepository.findOne(id, {
      where: { user },
    });

    if (!token) {
      throw new NotFoundException();
    }

    return plainToClass(Token, token);
  }

  async findToken(token: string): Promise<boolean> {
    if (!token) {
      throw new BadRequestException('Token must be sent');
    }
    const tokenSearch: Token = await this._tokenRepository.findOne({
      where: { token, status: 'ACTIVE' },
    });
    return !!tokenSearch;
  }

  async create(token: CreateTokenDto): Promise<boolean> {
    const tokenCreate = plainToClass(Token, token);
    const createToken: Token = await this._tokenRepository.save(tokenCreate);
    return !!createToken;
  }

  async deactivate(token: string, user: User): Promise<boolean> {
    if (!token) {
      throw new BadRequestException('Token must be sent');
    }
    if (!user) {
      throw new BadRequestException('User must be sent');
    }

    const tokenSearch: Token = await this._tokenRepository.findOne({
      where: { token, user },
    });

    if (!tokenSearch) {
      throw new NotFoundException('Token not found');
    }
    tokenSearch.status = 'USED';
    await tokenSearch.save();
    const tokenDeleted = await this._tokenRepository.softDelete(tokenSearch.id);
    if (!tokenDeleted) {
      throw new NotFoundException('Token not deleted due to internal error');
    }
    return true;
  }

  async deactivateAll(user: User): Promise<boolean> {
    const tokens = await this.findAll(user);
    let validated = true;
    for (const token of tokens) {
      const deactivated = await this.deactivate(token.token, user);
      if (!deactivated) {
        validated = false;
      }
    }
    return validated;
  }
}
