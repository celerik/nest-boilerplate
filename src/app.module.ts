import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Configuration } from '@common/enums';
import { RoleModule } from '@modules/role/role.module';
import { PermissionModule } from '@modules/permission/permission.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MailModule } from '@common/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Configuration.APP_PORT);
  }
}
