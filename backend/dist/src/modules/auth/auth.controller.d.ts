import { LoginReqDto } from './models/dto/req/login.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';
import { IUserData } from './models/interfaces/user_data.interface';
import { ActivatePasswordReqDto } from './models/dto/req/activatePassword.req.dto';
import { AuthUserResDto } from './models/dto/res/auth_user.res.dto';
import { TokenPairResDto } from './models/dto/res/token_pair.res.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginReqDto): Promise<AuthResDto>;
    logOut(userData: IUserData): Promise<string>;
    activate(userData: IUserData, managerId: string): Promise<AuthResDto>;
    activatePassword(token: string, dto: ActivatePasswordReqDto): Promise<AuthResDto>;
    ban(userData: IUserData, managerId: string): Promise<AuthUserResDto>;
    unban(userData: IUserData, managerId: string): Promise<AuthUserResDto>;
    refresh(userData: IUserData): Promise<TokenPairResDto>;
}
