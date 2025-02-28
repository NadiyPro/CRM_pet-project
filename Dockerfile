## Використовуємо офіційний образ Node.js
#FROM node:20-alpine
#
## Встановлюємо необхідні пакети
## Додаємо Git, бо Husky його потребує
#RUN apk add --no-cache make g++ git
#
## Встановлюємо робочу директорію в контейнері
## в docker-compose.yml ми визнначили volumes: ./backend:/app
## що означає, що локальна папка backend буде відображатися у контейнері як /app
#WORKDIR /app
#
## Копіюємо package.json і package-lock.json
#COPY backend/package*.json ./
#
### Встановлюємо залежності
#RUN npm ci --legacy-peer-deps
#
### Створюємо папку dist, якщо вона не існує
#RUN mkdir -p dist
#
## Копіюємо весь код проєкту в контейнер
#COPY backend/ .
#
## Збираємо TypeScript-код
#RUN npm run build
#
### Видаляємо .js, .d.ts, .js.map з src/
##RUN find src -type f -name '*.js' -delete -o -name '*.d.ts' -delete -o -name '*.js.map' -delete
#
## Вказуємо команду для запуску
#CMD ["node", "dist/main.js"]

## Використовуємо офіційний образ Node.js
#FROM node:20-alpine
#
## Встановлюємо необхідні пакети
## Додаємо Git, бо Husky його потребує
#RUN apk add --no-cache make g++ git
#
## Встановлюємо робочу директорію в контейнері
#WORKDIR /app
#
## Копіюємо package.json і package-lock.json для встановлення залежностей
#COPY backend/package*.json ./
#
## Встановлюємо залежності
#RUN npm ci --legacy-peer-deps
#
## Копіюємо весь код проєкту в контейнер
#COPY backend/ ./
#
## Створюємо папку dist (на випадок, якщо білд не створить її автоматично)
#RUN mkdir -p dist
#
## Збираємо TypeScript-код
#RUN npm run build
#
## Вказуємо команду для запуску
#CMD ["node", "dist/main.js"]

# Використовуємо офіційний образ Node.js
FROM node:20-alpine

# Встановлюємо необхідні пакети
# Додаємо Git, бо Husky його потребує
RUN apk add --no-cache make g++ git

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json і package-lock.json для встановлення залежностей
COPY backend/package*.json ./

# Встановлюємо залежності
RUN npm ci --legacy-peer-deps

# Копіюємо весь код проєкту в контейнер
COPY backend ./

# Видаляємо старий білд (на випадок залишкових файлів)
RUN rm -rf dist

# Збираємо TypeScript-код
RUN npm run build

# Перевіряємо, чи створилася dist/main.js
RUN ls -la dist

# Вказуємо команду для запуску
CMD ["node", "dist/main.js"]