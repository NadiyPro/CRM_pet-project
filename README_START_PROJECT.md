# 🌟 Final_project (Start_project)
Це повноцінна CRM системи для управління заявками на курси, ролями користувачів (admin, manager), групами, розсилками, а також для генерації статистики та експорту в Excel. 
Система складається з:
+ Backend: NextJS, TypeScript, MySQL, Redis 
+ Frontend: React, TypeScript, Redux Toolkit, SCSS 
+ Docker (з Nginx)

### ⚙️ Технології
+ **Backend:**
  + NestJS — серверний фреймворк
  + TypeORM — ORM для MySQL
  + MySQL — реляційна база даних
  + Redis — для зберігання токенів/кешу
  + JWT — аутентифікація/авторизація
  + Docker — контейнеризація
  + Swagger — авто-документація API
  + nodemailer — email-розсилка
  + exceljs, xlsx - завантаження данних в excel файл
  + TypeScript - типізація  

+ **Frontend:**
  + React - фреймворк для побудови інтерфейсу 
  + Redux Toolkit - управління станом (store)
  + TypeScript - типізація
  + SCSS - стилізація, з використанням предпроцесору
  + детальніше бібліотеки які використовувались: 
    + @reduxjs/toolkit, redux, react-redux - набір бібліотек для управління станом через Redux store
    + react-hook-form -  бібліотека для управління формами
    + axios - бібліотека для роботи із запитами API
    + react-router-dom - бібліотека для маршрутизації
    + joi - бібліотека для валідації даних
    + @hookform/resolvers - бібліотека для взаємодії joi з react-hook-form
    + @types/ lodas - типи для бібліотеки lodash, для можливості використовувати Pick / Omit
    + react-scripts - бібліотека для запуску збірки frontend (частина Create React App)
    + dayjs - бібліотека для форматування дати
+ **Тести:**
  + jest для Unit тестів
  + тест WebdriverIO для e2e тестів

###  🔧 Структура проекту
```
final_project/
├── .husky/
├── backend/            # Серверна частина (NestJS)
├── frontend/           # Клієнтська частина (React + Redux), тести Unit (jest)
├── test/               # e2e тест (WebdriverIO)
├── docker-compose.local.yaml
├── Dockerfile          # Dockerfile для backend
├── Dockerfile.frontend # Dockerfile для frontend
├── nginx/
│   └── default.conf    # Nginx конфіг для React
├── wdio.conf.ts
```
### 📦 Вимоги до запуску

+ Встановлений **Docker** 
+ Заповнений файл `.env` у теці `backend` (детальніше в [README_BACKEND.md](README_BACKEND.md))

### 🚀 Запуск проєкту

1. Проєкт повністю контейнеризовано. Запуск проекту:
```bash
$ docker-compose -f docker-compose.local.yaml up --build
```
Це підніме наступні сервіси:
+ backend — NestJS API
+ mysql — база даних
+ redis — кеш-сервер
+ frontend — NextJS typeScript

2. Після запуску:

+ Backend: http://localhost:3000
+ Swagger: http://localhost:3000/api
+ Postman: Колекція для Postman збережена в теці `/backend/src/infrastructure/repository/postman_collection/`
+ Frontend: http://localhost:80

### 🐳 Docker-команди
+ Повний запуск (з кореневої теки):
```bash
$ docker-compose -f docker-compose.local.yaml up --build
```

+ Запуск лише backend (попередньо заходимо в теку `cd backend`):
```bash
$ docker-compose -f docker-compose.local.yaml up --build
```

+ Зупинити контейнери:
```bash
$ docker-compose -f docker-compose.local.yaml down
```

## 🖥️ Frontend (React + Redux Toolkit)
+ побудований за допомогою React + TypeScript
+ стан зберігається через Redux Toolkit
+ білд автоматично копіюється до nginx (/usr/share/nginx/html)
+ файли розташовані у теці frontend/

###  🔧 Структура папок та файлів (frontend)
```
final_project/
├── .husky/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/                     # компоненти
│   │   ├── layout/                         # layout в якому рендяться сторінки 
│   │   ├── module/                         # enums та dto
│   │   ├── page/                           # основні сторінки
│   │   ├── redux/                          # Redux store
│   │   │    ├──reducers/
│   │   │    ├──slices/
│   │   │    └──store.tsx
│   │   ├── router/                         # маршрутизація
│   │   ├── service/                        # севіси на які робимо запити (API) через axios
│   │   ├── styles/                         # стилі SCSS
│   │   ├── validator/                      # валідація через Joi бібліотеку
│   │   ├── test_jest/                      # тести Unit (jest) для валідації та стану
│   │   └── index.tsx
│   ├── eslint.config.mjs
│   ├── tsconfig.json
│   ├── package-lock.json
│   └── package.json
├── nginx/
│   └── default.conf                        # Nginx конфіг для React
├── test/                                   # e2e тест (WebdriverIO)
├── .gitignore
├── .dockerignore
├── Dockerfile.frontend                     # Dockerfile frontend
├── Dockerfile                              # Dockerfile backend
├── docker-compose.yml                      # Docker Compose конфіг
├── wdio.conf.ts
```

### 📂 Конфігурація nginx
Nginx виконує роль сервера для frontend:
+ cлухає порт 80
+ обслуговує React build із /usr/share/nginx/html
+ всі запити запускаються з кореня / до index.html
+ файл конфігурації: nginx/default.conf

## 🔐 Backend (NestJS TypeScript)
Детальна документація до API, опис, структура, DTO, swagger, авторизація та міграції — описані окремо у [README_BACKEND.md](README_BACKEND.md)

## ✅ Тестування
У проекті реалізовано два види тестів:
+ Unit (jest) для валідації та асинхронний thunk дії Redux Toolkit
+ e2e тест (WebdriverIO) для авторизації та rout

### 🧾 Unit тести (Jest)
+ Технології: Jest, @testing-library, ts-jest
+ Тестуються:
  + валідація форм через Joi
  + асинхронний thunk дії Redux Toolkit
  + запуск тесту:
```bash
cd frontend
npm run test
```
### 🌐 E2E тести (WebdriverIO)
+ Технології: WebdriverIO, @wdio/globals
+ Тестуються:
  + авторизація (login)
  + перехід після логінації на сторінку `/orders`
  + запуск тесту:
```bash
npx wdio run wdio.conf.ts
```
або (внесено в package.json)
```bash
npm run test:e2e
```

###  🔧 Структура папок та файлів для тестів
```
final_project/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── ...                      
│   │   ├── test_jest/                      # тести Unit (jest) для валідації та стану
│   │   │       ├── store_test_jest/
│   │   │       │         └── store_ordersAll_jest.test.tsx
│   │   │       └── valid_test_jest/
│   │   │                 ├── validator_authLogin_jest.test.tsx
│   │   │                 ├── validator_authPassword_jest.test.tsx
│   │   │                 ├── validator_creteMessage_jest.test.tsx
│   │   │                 ├── validator_giveRole_jest.test.tsx
│   │   │                 ├── validator_group_name_jest.test.tsx
│   │   │                 └── validator_order_jest.test.tsx
│   │   └── index.tsx
│   ├── eslint.config.mjs
│   ├── tsconfig.json
│   ├── package-lock.json
│   └── package.json
├── nginx/
│   └── default.conf                        # Nginx конфіг для React
├── test/                                   # e2e тест (WebdriverIO)
│   ├── pageobjects/
│   │       ├── login.page.ts
│   │       └── page.ts
│   └── specs/
│   │       └── test.e2e.ts
├── package.json 
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── .dockerignore
├── Dockerfile.frontend                     # Dockerfile frontend
├── Dockerfile                              # Dockerfile backend
├── docker-compose.yml                      # Docker Compose конфіг
├── wdio.conf.ts
```
