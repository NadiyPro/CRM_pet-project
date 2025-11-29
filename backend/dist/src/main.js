"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const swagger_helper_1 = require("./common/helpers/swagger.helper");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const customErrorUnauthorized_1 = require("./modules/auth/customErrorUnauthorized/customErrorUnauthorized");
const common_1 = require("@nestjs/common");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost',
            'http://localhost:80',
            'http://127.0.0.1:5173',
            'http://18.119.206.49',
        ],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('final_project_NadiaPro')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth({
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new customErrorUnauthorized_1.CustomErrorUnauthorized());
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_helper_1.SwaggerHelper.setDefaultResponses(document);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            url: '/docs-json',
            docExpansion: 'list',
            defaultModelsExpandDepth: 7,
            persistAuthorization: true,
        },
    });
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get('app');
    await app.listen(appConfig.port, '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map