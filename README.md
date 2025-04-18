# 🌟 Final_project (Back-end)
Серверна частина CRM системи для управління заявками на курси, ролями користувачів (admin, manager), групами, розсилками, а також для генерації статистики та експорту в Excel. Проєкт побудований на фреймворку **NestJS**, з використанням **MySQL**, **Redis**, **Docker** та **JWT-автентифікації**.

## ⚙️ Технології
+ NestJS — серверний фреймворк
+ TypeORM — ORM для MySQL
+ MySQL — реляційна база даних
+ Redis — для зберігання токенів/кешу
+ JWT — аутентифікація/авторизація
+ Docker — контейнеризація
+ Swagger — авто-документація API
+ nodemailer — email-розсилка

##  🔧 Структура проекту
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

## 📜 Postman
Колекція для Postman збережена в теці 
```
/backend/src/infrastructure/repository/postman_collection/
```
## 📕 Redis
Redis використовується для:
+ Зберігання access токенів
+ Кешування даних (опційно)
+ Інтегровано через окремий модуль redis.module.ts

## 🔐 Авторизація та Ролі
Використовується JWT з розділенням на:
 + access -  коротокостроковий, зберігається в Redis
 + refresh токени - довготривалий, зберігається БД

Ролі реалізовано через:
+ @Roles('admin')/@Roles('manager')
+ RolesGuard

Користувачі мають ролі:
+ ADMIN – повний доступ, керування користувачами, заявками, статистикою
+ MANAGER – обробка заявок

Захист маршрутів через кастомні Guards:
+ @UseGuards(JwtAccessGuard)
+ @UseGuards(JwtRefreshGuard)

## 🧩 Сутності
UserEntity - користувачі
+ Поля: id, name, surname, email, password, role, is_active, deleted
+ Зв’язки: 
  + refreshTokens – один до багатьох з RefreshTokenEntity
  + orders – один до багатьох з OrdersEntity
  + messages – один до багатьох з MessageEntity

OrdersEntity - заявки (ордери)
+ Поля: id, name, surname, email, phone, age, course, course_format, course_type, sum, alreadyPaid, utm, msg, status, group_id, group_name
+ Наслідує CreateUpdateModel
+ Зв’язки:
  + manager – багато до одного з UserEntity
  + messages – один до багатьох з MessageEntity

MessageEntity - коментарі (повідомлення)
+ Поля: id, messages, created_at, updated_at
+ Зв’язки:
  + order – багато до одного з OrdersEntity
  + manager – багато до одного з UserEntity

RefreshTokenEntity - зберігаємо refresh токени
+ Поля: id, refreshToken, deviceId, user_id
+ Наслідує CreateUpdateModel
+ Зв’язок:
  + user – багато до одного з UserEntity

GroupEntity - групи нна які розподілені заявки
+ Поля: id, group_name
+ Наслідує CreateUpdateModel

CreateUpdateModel - дати створення та оновлення даних
+ Поля: created_at, updated_at

## 🧾 Enums
+ CourseEnum - назва курсу
  + FS, QACX, JCX, JSCX, FE, PCX
+ CourseFormatEnum - вид навчання
  + static, online
+ CourseTypeEnum - тип курсу
  + pro, minimal, premium, incubator, vip
+ RoleTypeEnum - ролі для користувачів
  + manager, admin
+ StatusEnum - статус договору
  + In_work, New, Aggre, Disaggre, Dubbing
+ TableNameEnum - назви таблиць (сутностей)
  + refresh_tokens, users, orders, message, group, auth

## 📨 Email
+ Надсилання листів реалізовано через nodemailer
+ Email-конфігурація зчитується з .env

## 📊 Експорт у Excel
Формує файл orders.xlsx із поточними фільтрами, сортуванням та заявками (можна вивантажити всі заявки, а можна вивантажити лише свої заявки з урахуванням фільтрів, без прив'язки до пагінації)
Доступний ендпоінт:
```
GET /orders/export
```
## 📦 Приклади ендпоінтів
+ POST /auth/login — для логінації на платформі
+ POST /auth/logOut — для виходу з акаунту та видалення токенів користувача
+ POST /auth/activate/:managerId — для видачі токена менеджеру для активації (надсилаємо на email)
+ POST /auth/activate/:token — для активації паролю менеджером
+ POST /auth/ban/:managerId — для блокування менеджера (is_active = false) та видалення його токенів
+ POST /auth/unban/:managerId — для розблокування менеджера (is_active = true)
+ POST /auth/refresh — для отримання нової пари токенів
+ POST /users/role — видача ролі
+ GET /users/all — перегляд усіх менеджерів
+ DELETE /users/:managerId — видалити менеджера
+ GET /orders — відобразити всі заявки, присутня фільтрація + пагінація + сортування заявок
+ GET /orders/export - вивантажити orders.xlsx із врахуванням фільтрів, сортуванням та заявками, без прив'язки до пагінації
+ POST /orders — створити заявку
+ GET /orders/ordersStatisticAll — статистика по всім заявкам
+ GET /orders/ordersStatisticManager — статистика по заявкам конкретного менеджера
+ POST /orders/:orderId/:group_id — прив'язка заявки до групи
+ PUT /orders/:orderId — для оновлення даних по заявці
+ GET /orders/:orderId - для відображення інформації по конкретній заявці (orderId)
+ Delete /orders/:orderId - для видалення заявки згідно її orderId
+ GET /group - відображення всіх group та пошуку по назві group
+ POST /group - для створення нової group
+ Delete /group/:groupId - для видалення групи пор її groupId
+ GET /message - для відображення всіх коментарів (повідомлень)
+ GET /message/:orderId - для перегляду всіх коментарів, по конкретній заявці за її orderId
+ POST /message - для створення коментаря
+ Delete /message/:messageId - для видалення коментаря по його messageId

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
