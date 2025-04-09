import { EmailConfig } from '../../../configs/config.type';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EmailPayloadCombined } from '../types/email_payload.type';
import { EmailTypeEnum } from '../enums/email.enum';
import { emailConstants } from '../constants/email.constants';
import { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: Transporter;
  private userPass: EmailConfig;

  constructor(private readonly configService: ConfigService) {}

  // Метод для асинхронної ініціалізації
  onModuleInit() {
    this.userPass = this.configService.get<EmailConfig>('email');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      from: 'No reply',
      auth: {
        user: this.userPass.email,
        pass: this.userPass.password,
      },
    });

    this.initHandlebars();
  }

  private initHandlebars() {
    // const hbs = await import('nodemailer-express-handlebars');
    const hbsOptions = {
      viewEngine: {
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: path.join(
          process.cwd(),
          'src',
          'modules',
          'email',
          'templates',
          'layouts',
        ),
        partialsDir: path.join(
          process.cwd(),
          'src',
          'modules',
          'email',
          'templates',
          'partials',
        ),
      },
      viewPath: path.join(
        process.cwd(),
        'src',
        'modules',
        'email',
        'templates',
        'views',
      ),
      extName: '.hbs',
    };

    this.transporter.use('compile', hbs(hbsOptions));
  }

  public async sendMail(
    type: EmailTypeEnum,
    to: string,
    context: EmailPayloadCombined,
  ): Promise<void> {
    const { subject, template } = emailConstants[type];
    const options = { to, subject, template, context };
    await this.transporter.sendMail(options);
  }
}
