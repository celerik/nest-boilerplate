/** @packages */
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

/** @application */
import { appPort } from './environments';

/** @modules */
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { RoleModule } from '@modules/role/role.module';
import { PermissionModule } from '@modules/permission/permission.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TokenModule } from '@modules/token/token.module';
import { MailModule } from '@common/mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    TokenModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number = appPort;
}
