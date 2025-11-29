"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const config_1 = require("@nestjs/config");
const path = require("node:path");
const common_1 = require("@nestjs/common");
const email_constants_1 = require("../constants/email.constants");
const nodemailer = require("nodemailer");
const nodemailer_express_handlebars_1 = require("nodemailer-express-handlebars");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        this.userPass = this.configService.get('email');
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
    initHandlebars() {
        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'src', 'modules', 'email', 'templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'src', 'modules', 'email', 'templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'src', 'modules', 'email', 'templates', 'views'),
            extName: '.hbs',
        };
        this.transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(hbsOptions));
    }
    async sendMail(type, to, context) {
        const { subject, template } = email_constants_1.emailConstants[type];
        const options = { to, subject, template, context };
        await this.transporter.sendMail(options);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map