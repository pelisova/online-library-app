import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { JwtPayload } from "./jwt-payload.interface";

// PassportStrategy provide authentication rules on every API endpoint.
// secret key here is used for andpoints.
// jwtFromRequest is used for extracting token from request with specified method.
// validate function will be triggered when token is valid and it will return user
// it helps us to create custom decorator for role authorization.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            secretOrKey: 'mysecretkeyforapp',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    // only user with valid and right token can access to specific endpoint.
    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.userRepository.findOne({email});
        //da se ne vracu knjige
        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}