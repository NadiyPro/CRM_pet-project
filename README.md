

Серверна частина проєкту, побудована на **NestJS**, з використанням **MySQL**, **Redis**, **Docker**, **JWT аутентифікації**, авторизації, електронної пошти, та іншого. Система підтримує ролі користувачів, роботу з ордерами, повідомленнями, групами та міграціями.
## ⚙️ Технології
+ NestJS — серверний фреймворк
+ TypeORM — ORM для MySQL
+ MySQL — реляційна база даних
+ Redis — для зберігання токенів/кешу
+ JWT — аутентифікація/авторизація
+ Docker — контейнеризація
+ Swagger — авто-документація API
+ nodemailer — email-розсилка

##  🔧 The structure of the project
```
final_project/
├── .husky/
├── backend/
│   ├── dist/                      # Скомпільовані JS-файли
│   ├── src/
│   │   ├── common/
│   │   │   └── helpers/           # Допоміжні функції (Swagger, трансформації)
│   │   ├── configs/               # Конфігураційні файли
│   │   ├── infrastructure/        # Зовнішні сервіси та ресурси
│   │   │   ├── mysql/             # Підключення до MySQL (TypeORM)
│   │   │   ├── redis/             # Підключення до Redis
│   │   │   └── repository/        # Сервіси роботи з базами, postman_collection
│   │   ├── modules/               # Основні модулі системи
│   │   │   ├── auth/              # Авторизація/Аутентифікація (JWT)
│   │   │   ├── email/             # Логіка для надсилання email
│   │   │   ├── group/             # Робота з групами
│   │   │   ├── guards/            # NestJS Guards
│   │   │   ├── message/           # Повідомлення
│   │   │   ├── orders/            # Замовлення
│   │   │   └── users/             # Користувачі
│   │   ├── app.module.ts          # Головний модуль додатку
│   │   ├── main.ts                # Точка входу в застосунок
│   ├── .env
│   ├── .env.example
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── ormconfig.ts
│   ├── tsconfig.json
│   └── package.json
├── test/                          # Тестові файли
├── Dockerfile                     # Dockerfile
├── docker-compose.yml            # Docker Compose конфіг
```

## 🚀 Запуск проєкту
1. Перейди в папку **backend**:

```bash
cd backend
```

2. Встанови залежності:

```bash
npm install
```

3. Створи файл `.env` зі змінними середовищами:

```
APP_PORT=
APP_HOST=

MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_ACCESS_ACTIVE_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

SMTP_EMAIL=
SMTP_PASSWORD=
```
4. Проєкт повністю контейнеризовано. Запуск проекту:
```bash
$ docker-compose -f ../docker-compose.local.yaml up -d --build
```
Це підніме наступні сервіси:
+ backend — NestJS API
+ mysql — база даних
+ redis — кеш-сервер

## 🧱 Міграції
Міграції створюються через TypeORM CLI:
```bash
cd backend
typeorm-ts-node-commonjs --dataSource ./ormconfig.ts
cross-var npm run typeorm -- migration:generate ./src/infrastructure/mysql/migrations/$npm_config_name
npm run typeorm -- migration:run
```
Файли з міграціями знаходяться у: 
```
/backend/src/infrastructure/mysql/migrations/
```

## 📜 Swagger
Swagger доступний за адресою:
```bash
http://localhost:3000/api
```
Генерується автоматично на основі декораторів.

## Postman
Колекція для Postman збережена в теці 
```
/backend/src/infrastructure/repository/postman_collection/
```
## 🧠 Redis
Redis використовується для:
+ Зберігання access токенів
+ Кешування даних (опційно)
+ Інтегровано через окремий модуль redis.module.ts







## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
