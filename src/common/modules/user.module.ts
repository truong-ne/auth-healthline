import { Module } from '@nestjs/common';
import { UserAuthService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { User } from '../entities/user.entity';
import { UserStrategy } from '../strategies/user.strategy';
import { UserAuthController } from '../controllers/user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'user' }),
        JwtModule.register({
            global: true,
            secret: process.env.USER_SECRET,
            signOptions: { expiresIn: '14d' }
        }),
        TypeOrmModule.forFeature([Token, User]),
    ],
    providers: [
        UserAuthService,
        UserStrategy,
    ],
    controllers: [
        UserAuthController,
    ]
})
export class UserAuthModule { }