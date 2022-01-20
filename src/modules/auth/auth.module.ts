/** @packages */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

/** @imports */
import { jwtExpiresIn, jwtSecret } from '@base/environments';
import { TokenModule } from '@modules/token/token.module';

/** @module */
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtExpiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
