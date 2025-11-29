import { ConfigService } from '@nestjs/config';
import { OnModuleInit } from '@nestjs/common';
import { EmailPayloadCombined } from '../types/email_payload.type';
import { EmailTypeEnum } from '../../enums/email.enum';
export declare class EmailService implements OnModuleInit {
    private readonly configService;
    private transporter;
    private userPass;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private initHandlebars;
    sendMail(type: EmailTypeEnum, to: string, context: EmailPayloadCombined): Promise<void>;
}
