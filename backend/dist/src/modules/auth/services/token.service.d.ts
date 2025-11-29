import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../../configs/config.type';
import { TokenType } from '../../enums/token_type.enum';
import { IJwtPayload } from '../models/interfaces/jwt_payload.interface';
import { ITokenPair } from '../models/interfaces/token_pair.interface';
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    private readonly jwtConfig;
    constructor(jwtService: JwtService, configService: ConfigService<Config>);
    generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair>;
    generateActiveTokens(payload: {
        userId: string;
    }): Promise<ITokenPair>;
    verifyToken(token: string, type: TokenType): Promise<IJwtPayload>;
    private getSecret;
}
