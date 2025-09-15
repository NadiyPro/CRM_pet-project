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

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost',
      'http://localhost:80',
      'http://127.0.0.1:5173',
    ],
    credentials: true, // credentials: true - дозволяє передавати куки/токени між фронтом і беком
  }); // вказуємо з яких адрес можна робити запити на бекенд (enableCors - вмикає CORS у NestJS)
  // це я пишу бо nginx рендить в мене на 80 порті контейнери, щоб мати доступ фронту до беку

  const config = new DocumentBuilder() //  Створює новий об'єкт для побудови конфігурації Swagger
    .setTitle('final_project_NadiaPro') // Встановлює заголовок API документації
    .setDescription('The API description') // опис нашого API
    .setVersion('1.0') // версія нашого API
    .addBearerAuth({
      in: 'header', //вказує, що токен буде передаватися в заголовку HTTP-запиту.
      type: 'http', // тип авторизації — HTTP
      scheme: 'bearer', // Схема авторизації — Bearer
      bearerFormat: 'JWT', //  Формат токена — JWT (JSON Web Token)
    }) // Додає налаштування для авторизації типу Bearer, що використовується для JWT токенів
    .build(); // Створює остаточну конфігурацію на основі вказаних параметрів

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // ця опція автоматично видаляє всі властивості,
      // яких немає у валідаційних класах.Якщо клієнт надішле додаткові поля у запиті,
      // які не зазначені в DTO, вони будуть автоматично видалені.
      transform: true,
      // transform: true, вхідні дані (наприклад, об'єкт JSON)
      // перетворюються на екземпляри класів, що дозволяє виконувати типізацію й перевірку типів
      // щоб працювали декоратори трансформерів, ми ОБОВЯЗКОВО маємо вказати transform: true
      forbidNonWhitelisted: true,
      // Якщо клієнт надішле зайві поля, додаток поверне помилку, вказуючи, що ці поля неприпустимі.
    }),
  ); // app.useGlobalPipes - ця функція додає глобальні пайпи в додаток.
  // Пайпи в NestJS застосовуються до вхідних даних
  // і можуть використовуватися для валідації, перетворення та ін.
  // CustomErrorUnauthorized кастомний клас який екстендиться від ValidationPipe та змінює 400 на 401
  // (ValidationPipe - це вбудований пайп у NestJS,
  // який використовує бібліотеку class-validator для валідації об'єктів і класів).
  // Він автоматично перевіряє дані, що надходять,
  // на основі валідаційних правил, визначених у класах за допомогою декораторів
  // Пайп( pipe) - це механізм обробки вхідних даних перевірка/перетворення перед тим,
  // як вони будуть передані у відповідні методи контролера

  app.useGlobalFilters(new CustomErrorUnauthorized());

  const document = SwaggerModule.createDocument(app, config);
  // Генерує документ Swagger (OpenAPI специфікацію)
  // на основі нашого NestJS додатку (app) та створеної конфігурації (config).
  SwaggerHelper.setDefaultResponses(document);
  // // змінює документ Swagger (що представляє собою OpenAPI специфікацію)
  // // і додає загальні відповіді для всіх маршрутів у вашому API
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      url: '/docs-json',
      docExpansion: 'list',
      // Встановлює, як розкривати розділи документації.
      // 'list' означає, що всі розділи будуть показані у вигляді списку і згорнуті за замовчуванням
      defaultModelsExpandDepth: 7,
      // Визначає глибину, до якої будуть розкриватися моделі даних.
      // Число 7 означає, що вкладені моделі будуть розкриті до 7 рівнів.
      persistAuthorization: true,
      // Дозволяє зберігати стан авторизації між перезавантаженнями сторінки.
      // Тобто, якщо ви ввели токен авторизації, він залишиться активним навіть після оновлення сторінки.
    },
  });
  // Налаштовує маршрут /docs, за яким буде доступна ваша Swagger документація

  const configService = app.get(ConfigService);
  // дістаємо конфігураційний сервіс з configuration.ts
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, '0.0.0.0');
  console.log(
    `Server is running on http://${appConfig.host}:${appConfig.port}`,
  );
  console.log(
    `Swagger docs available at http://${appConfig.host}:${appConfig.port}/docs`, // http://127.0.0.1:3000/docs
  );
}
void bootstrap();
