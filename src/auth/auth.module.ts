import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

console.log(process.env.JWT_SECRETE);

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // secret: configService.get('JWT_SECRETE'),
        secret: 'AFg3JMd2Awsp3mwtRraKMMB3zMNcc2G4',
        signOptions: { expiresIn: '7m' },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
