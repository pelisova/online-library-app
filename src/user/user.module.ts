import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';


/**
 * structure of UserModule
 * we import User entity into TypeOrm feature to create repository for User entity 
 * defining strategy for authentication and secret Key for sign_In with session time 
 * the exports array is used to make authentication useful throughout the application
 */


@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}), 
    JwtModule.register({ secret:'mysecretkeyforapp', signOptions: { expiresIn: 3600 }}),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class UserModule {}
