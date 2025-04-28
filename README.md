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
+ exceljs, xlsx - завантаження данних в excel файл

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
+ EmailTypeEnum - тип email розсилки
  + active
+ SortASCOrDESCEnum - тип сортування
  + ASC, DESC
+ SortFieldEnum - назви полів для роботи з заявками (orders)
  + id, name, surname, email, phone, age, course, course_format, course_type, status, sum, alreadyPaid, created_at, group_id, group_name, manager
+ TokenType - тип токену
  + access, refresh

## 📨 Email
Сервіс для надсилання листів (підтвердження реєстрації через зміну пароля)
+ Надсилання листів реалізовано через nodemailer
+ Email-конфігурація зчитується з .env

## 📊 Експорт у Excel
Формує файл orders.xlsx із поточними фільтрами, сортуванням та заявками (можна вивантажити всі заявки, а можна вивантажити лише свої заявки з урахуванням фільтрів, без прив'язки до пагінації)
Доступний ендпоінт:
```
GET /orders/export
```
## 📦 Приклади ендпоінтів та DTO
### auth
> POST /auth/login — для логінації на платформі 
>
> + Request: LoginReqDto
>```
> {
> email: string; // email користувача
> password: string; // пароль
> deviceId: string; // ідентифікатор пристрою
> }
>```
> + Response: AuthResDto
>```
> {
> tokens: {
>  accessToken: string;
>  refreshToken: string;
> },
> user: {
>  id: string;
>  email: string;
>  name: string;
>  surname: string;
>  is_active: boolean;
>  role: RoleTypeEnum;
> }
>```
> POST /auth/logOut — для виходу з акаунту та видалення токенів користувача
>
> + Request: немає тіла запиту, токен користувача зчитується з запиту (заголовку).  
    Response:
>```
> { message: 'Tokens deleted successfully' }
>``` 
> GET /auth/activate/:managerId — для видачі токена менеджеру для активації (надсилаємо на email)
> 
> + Request: вказуємо у URL параметр `managerId` id user якому видаємо токен
> + Response: AuthResDto
>```
> {
> tokens: {
>  accessToken: string;
>  refreshToken: string;
> },
> user: {
>  id: string;
>  email: string;
>  name: string;
>  surname: string;
>  is_active: boolean; // статус користувача (true/false)
>  role: RoleTypeEnum; // роль користувача (manager/admin)
> }
>```
> POST /auth/activate/:token — для активації паролю менеджером
>
> + Request: 
>  + вказуємо у URL параметр `token`  - токен, який отримав користувач на пошту в запиті /auth/activate/:managerId
>  + ActivatePasswordReqDto
>```
> {
> password: string; // пароль
> confirm_password: string; // повторюємо пароль для перевірки
> deviceId: string; // ідентифікатор пристрою
> }
>```
> + Response: AuthResDto
>```
> {
> tokens: {
>  accessToken: string;
>  refreshToken: string;
> },
> user: {
>  id: string;
>  email: string;
>  name: string;
>  surname: string;
>  is_active: boolean;
>  role: RoleTypeEnum;
> }
>```
> PUT /auth/ban/:managerId — для блокування менеджера (is_active = false) та видалення його токенів
>
> + Request: вказуємо у URL параметр  `managerId` id user якому видаємо токен
> + Response: AuthUserResDto  
    Повертає користувача зі статусом is_active: false.
> ```
> {
> id: string;
> email: string;
> name: string;
> surname: string;
> is_active: boolean; //  в данному енндпоінті, повертає користувача зі статусом is_active: false.
> role: RoleTypeEnum;
> }
> ```
> PUT /auth/unban/:managerId — для розблокування менеджера (is_active = true)
>
> + Request: вказуємо у URL параметр `managerId` id user якому видаємо токен
> + Response: AuthUserResDto  
    Повертає користувача зі статусом is_active: true.
> ```
> {
> id: string;
> email: string;
> name: string;
> surname: string;
> is_active: boolean; //  в данному енндпоінті, повертає користувача зі статусом is_active: true.
> role: RoleTypeEnum;
> }
> ```
> POST /auth/refresh — для отримання нової пари токенів
> + Request: немає тіла запиту, вказуємо валідний refreshToken у запиті (заголовку).
> + Response: TokenPairResDto
> ```
> {
> accessToken: string;
> refreshToken: string;
> }
> ```
### users
> POST /users/role — видача ролі
> 
> + Request: GiveRoleDto
> ```
> {
> name: string;
> surname: string;
> email: string;
> }
> ```
> + Response: UserResDto
> ```
> {
> id: string;
> name: string;
> surname: string;
> email: string;
> is_active: boolean;
> role: RoleTypeEnum;
> deleted: Date | null;
> }
> ```
> GET /users/all — перегляд усіх менеджерів
> 
> + Request: вказуємо в URL query ListUsersQueryReqDto, за замовченням: limit = 10, page = 1
> ``` 
> {
> limit?: number;
> page?: number;
> }
> ```
> + Response: ListResQueryDto
> ```
> {
> users: {
>  id: string;
>  name: string;
>  surname: string;
>  email: string;
>  is_active: boolean;
>  role: RoleTypeEnum;
>  deleted: Date | null;
> },
> total: number;
> }
> ```
> DELETE /users/:managerId — видалити менеджера
> 
> + Request: вказуємо у URL параметр `managerId` id user, якого видаляємо
> + Response:
>```
> { message: 'The user in the table (db) has been successfully marked as deleted' }
>``` 
### orders
> GET /orders — відобразити всі заявки, присутня фільтрація + пагінація + сортування заявок
>
> + Request: 
>  + зчитуємо id user із запиту
>  + вказуємо в URL query ListOrdersQueryReqDto, за замовченням: limit = 25, page = 1, sortField = created_at, sortASCOrDESC = DESC, me = false
>```
> {
> limit?: number;
> page?: number;
> searchField?: SortFieldEnum | null; // описано в розділі Enums
> search?: string;
> sortField?: SortFieldEnum | null;
> sortASCOrDESC?: SortASCOrDESCEnum | null;
> me?: boolean;
> }
>```
> + Response: ListOrdersResQueryDto
>```
> {
> orders: {
>  id: number | null;
>  name: string | null;
>  surname: string | null;
>  email: string | null;
>  phone: string | null;
>  age: number | null;
>  course: CourseEnum | null; // описано в розділі Enums
>  course_format: CourseFormatEnum | null;
>  course_type: CourseTypeEnum | null;
>  status: StatusEnum | null;
>  sum: number | null;
>  alreadyPaid: number | null;
>  created_at: Date;
>  updated_at: Date | null;
>  manager: string | null;
>  group_id: number | null;
>  group: string | null;
>  messages: MessageEntity[] | null;
> },
> total: number;
> }
>```
> 
> GET /orders/export - вивантажити orders.xlsx із врахуванням фільтрів, сортуванням та заявками, без прив'язки до пагінації
> 
> + Request: 
>  + зчитуємо id user із запиту
>  + зчитуємо res: Response
>  + вказуємо в URL query ListOrdersExportReqDto, за замовченням: sortField = created_at, sortASCOrDESC = DESC, me = false
>```
> {
> searchField?: SortFieldEnum | null; // описано в розділі Enums
> search?: string;
> sortField?: SortFieldEnum | null;
> sortASCOrDESC?: SortASCOrDESCEnum | null;
> me?: boolean;
> }
>```
> + Response: документ для завантаження в форматі .xlsx (Excel), завантажуємо все БЕЗ привязки до limit та page
>
> POST /orders — створити заявку
> 
> + Request: зчитуємо id user із запиту, CreateOrdersReqDto
>```
> {
> name: string | null;
> surname: string | null;
> email: string | null;
> phone: string | null;
> age: number | null;
> course: CourseEnum | null; // описано в розділі Enums
> course_format: CourseFormatEnum | null;
> course_type: CourseTypeEnum | null;
> sum: number | null;
> alreadyPaid: number | null;
> status: StatusEnum | null;
> }
>```
> + Response: OrdersEntity (опис в розділі "Сутності")
> 
> GET /orders/ordersStatisticAll — статистика по всім заявкам
> 
> + Request: немає тіла запиту
> + Response: OrdersStatisticAllResDto> 
>```
> {
> total: number | null;
> In_work: number | null;
> New: number | null;
> Aggre: number | null;
> Disaggre: number | null;
> Dubbing: number | null;
> }
>```
> 
> GET /orders/ordersStatisticManager — статистика по заявкам конкретного менеджера
> 
> + Request: немає тіла запиту
> + Response: OrdersStatisticResDto[]
>```
> {
> manager: string | null;
> total: number | null;
> In_work: number | null;
> New: number | null;
> Aggre: number | null;
> Disaggre: number | null;
> Dubbing: number | null;
> }
>```
> POST /orders/:orderId/:group_id — прив'язка заявки до групи
> 
> + Request: 
> вказуємо у URL параметр: 
>  + `orderId` - id заявки
>  + `group_id` - id групи
> + Response: OrdersEntity (опис в розділі "Сутності")
> 
> PUT /orders/:orderId — для оновлення даних по заявці
> 
> + Request: 
>  + зчитуємо id user із запиту
>  + вказуємо у URL параметр `orderId` (id заявки)
>  + UpdateOrdersReqDto
>```
> {
> name: string | null;
> surname: string | null;
> email: string | null;
> phone: string | null;
> age: number | null;
> course: CourseEnum | null; // описано в розділі Enums
> course_format: CourseFormatEnum | null;
> course_type: CourseTypeEnum | null;
> sum: number | null;
> alreadyPaid: number | null;
> status: StatusEnum | null;
> }
>``` 
> + Response: UpdateOrdersResDto
>``` 
> {
> id: number | null;
> name: string | null;
> surname: string | null;
> email: string | null;
> phone: string | null;
> age: number | null;
> course: CourseEnum | null;
> course_format: CourseFormatEnum | null;
> course_type: CourseTypeEnum | null;
> status: StatusEnum | null;
> sum: number | null;
> alreadyPaid: number | null;
> created_at: Date;
> updated_at?: Date | null;
> manager: UserEntity;
> group_id: number | null;
> group_name: string | null;
> messages: MessageEntity[] | null;
> } 
>``` 
> + GET /orders/:orderId - для відображення інформації по конкретній заявці (orderId)
> + Delete /orders/:orderId - для видалення заявки згідно її orderId
### group
> + GET /group - відображення всіх group та пошуку по назві group
> + POST /group - для створення нової group
> + Delete /group/:groupId - для видалення групи пор її groupId
### message
> + GET /message - для відображення всіх коментарів (повідомлень)
> + GET /message/:orderId - для перегляду всіх коментарів, по конкретній заявці за її orderId
> + POST /message - для створення коментаря
> + Delete /message/:messageId - для видалення коментаря по його messageId

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
