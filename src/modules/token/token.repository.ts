/** @packages */
import { EntityRepository, Repository } from 'typeorm';

/** @imports */
import { Token } from '@database/entities';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
