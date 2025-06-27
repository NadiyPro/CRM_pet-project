# 🌟 Final_project (Start_project)
Це повноцінна CRM системи для управління заявками на курси, ролями користувачів (admin, manager), групами, розсилками, а також для генерації статистики та експорту в Excel. 
Система складається з:
+ Backend: NextJS, TypeScript, MySQL, Redis 
+ Frontend: React, TypeScript, Redux Toolkit, SCSS 
+ Docker (з Nginx)

## ⚙️ Технології
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

##  🔧 Структура проекту
```
final_project/
├── .husky/
├── backend/            # Серверна частина (NestJS)
├── frontend/           # Клієнтська частина (React + Redux)
├── docker-compose.local.yaml
├── Dockerfile          # Dockerfile для backend
├── Dockerfile.frontend # Dockerfile для frontend
├── nginx/
│   └── default.conf    # Nginx конфіг для React
```
## 📦 Вимоги до запуску

+ Встановлений **Docker** 
+ Заповнений файл `.env` у теці `backend` (детальніше в [README_BACKEND.md](README_BACKEND.md))

## 🚀 Запуск проєкту

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

## 🐳 Docker-команди
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

##  🔧 Структура папок та файлів (frontend)
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
│   │   └── index.tsx
│   ├── eslint.config.mjs
│   ├── tsconfig.json
│   ├── package-lock.json
│   └── package.json
├── nginx/
│   └── default.conf                        # Nginx конфіг для React
├── .gitignore
├── .dockerignore
├── Dockerfile.frontend                     # Dockerfile frontend
├── Dockerfile                              # Dockerfile backend
├── docker-compose.yml                      # Docker Compose конфіг
```

## 📂 Конфігурація nginx
Nginx виконує роль сервера для frontend:
+ cлухає порт 80
+ обслуговує React build із /usr/share/nginx/html
+ всі запити запускаються з кореня / до index.html
+ файл конфігурації: nginx/default.conf

## 🔐 Backend (NestJS)
Детальна документація до API, опис, структура, DTO, swagger, авторизація та міграції — описані окремо у [README_BACKEND.md](README_BACKEND.md)