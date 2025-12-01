import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/config.type';
import * as dotenv from 'dotenv';
import { CustomErrorUnauthorized } from './modules/auth/customErrorUnauthorized/customErrorUnauthorized';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // NestFactory – фабрика, що вміє створювати Nest-додатки.
  // create(AppModule) – каже: "Створи застосунок, використовуючи головний модуль AppModule
  
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost',
      'http://localhost:80',
      'http://127.0.0.1:5173',
      'http://18.119.206.49',
      'http://18.119.206.49:80',
    ],
    credentials: true, // credentials: true - дозволяє передавати куки/токени між фронтом і беком
  });
  // CORS (enableCors + origin) потрібен для браузера
  // браузер блокує запити до беку, якщо фронт і бек на різних доменах або портах
  // nginx рендерить фронт на 80 порту, бек працює на 3000 порту
  // тому CORS потрібен, щоб браузер дозволяв фронту робити запити до бекенду
  // в origin пишемо адреси з яких ми дозволяємо фронту стукати до беку через браузер (enableCors - вмикає CORS у NestJS)

  const config = new DocumentBuilder() //  Створює новий об'єкт для побудови конфігурації Swagger
    .setTitle('final_project_NadiaPro')
    .setDescription('The API description')
    .setVersion('1.0') // версія нашого API
    .addBearerAuth({
      in: 'header', //вказує, що токен буде передаватися в заголовку HTTP-запиту.
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // якщо клієнт надішле додаткові поля у запиті,
      // які не зазначені в DTO, вони будуть автоматично видалені
      transform: true,
      // завдяки transform: true ми вхідні дані перетворюємо з JSON на потрібний нам формат
      // щоб працювали декоратори трансформерів, ми ОБОВЯЗКОВО маємо вказати transform: true
      forbidNonWhitelisted: true,
      // якщо клієнт надішле зайві поля, додаток поверне помилку, вказуючи, що ці поля неприпустимі.
    }),
  );
  // pipe - це механізм обробки вхідних даних перевірка/перетворення перед тим,
  // як вони будуть передані у відповідні методи контролера

  app.useGlobalFilters(new CustomErrorUnauthorized());
  // CustomErrorUnauthorized кастомний клас який екстендиться від ValidationPipe та змінює 400 на 401 для авторизації

  const document = SwaggerModule.createDocument(app, config);
  // створюємо документ для SwaggerModule
  SwaggerHelper.setDefaultResponses(document);
  // кажемо, що по дефолту відповіді прокидуємо в document
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      url: '/docs-json', // каже Swagger, звідки брати JSON-опис API (“сирий” JSON з описом API, а '/docs' - вже візуально гарний)
      docExpansion: 'list',
      // 'list' означає, що всі розділи будуть показані у вигляді списку
      defaultModelsExpandDepth: 7,
      // визначає глибину, до якої будуть розкриватися моделі даних.
      // тобто, вкладені моделі будуть розкриті до 7 рівнів.
      persistAuthorization: true,
      // дозволяє зберігати стан авторизації між перезавантаженнями сторінки.
      // тобто, якщо ми ввели токен авторизації, він залишиться активним навіть після оновлення сторінки.
    },
  });
  // налаштовує маршрут /docs, за яким буде доступна Swagger документація

  const configService = app.get(ConfigService);
  // дістаємо файл з конфігураціями (load:[configuration.ts]) імпортований в AppModule
  const appConfig = configService.get<AppConfig>('app');
  // дістаємо з нашого файлу configuration конфіги під 'app'
  await app.listen(appConfig.port, '0.0.0.0');
  // '0.0.0.0' для того щоб слухати всі мережеві інтерфейси, а не тільки локальний localHost
  // тобто, до сервера можна звертатися з будь-якої машини або контейнера Docker, а не тільки з ПК, де він запущений
  // console.log(
  //   `Swagger docs available at http://${appConfig.host}:${appConfig.port}/docs`, // http://127.0.0.1:3000/docs
  // );
}
void bootstrap();
