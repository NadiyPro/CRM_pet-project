## Використовуємо офіційний образ Node.js
#FROM node:20-alpine
#
## Встановлюємо необхідні пакети
#RUN apk add --no-cache make g++
#
## Встановлюємо робочу директорію в контейнері (локальна папка backend буде відображатися у контейнері як /app)
#WORKDIR /app
#
## Копіюємо backend/package.json і backend/package-lock.json у контейнер
#COPY backend/package*.json ./
#
## Копіюємо весь код проєкту в контейнер
#COPY backend ./
#
## Встановлюємо залежності
#RUN npm install --legacy-peer-deps
#
## Збираємо TypeScript-код (якщо у вас є TypeScript)
#RUN npm run build
#
## Команда для запуску програми
## (враховуючи, що в контейнері backend/ стає /app
## CMD повинен виглядати dist/src/main.js,
## оскільки, dist/src/main.js знаходиться в середині контейнера /app,
## а ми його встановили як робочу диреторію, тобто доступились до нього WORKDIR /app)
#CMD ["node", "dist/main.js"]
# Використовуємо офіційний образ Node.js
FROM node:20-alpine

# Встановлюємо необхідні пакети
# Додаємо Git, бо Husky його потребує
RUN apk add --no-cache make g++ git

# Встановлюємо робочу директорію в контейнері
# в docker-compose.yml ми визнначили volumes: ./backend:/app
# що означає, що локальна папка backend буде відображатися у контейнері як /app
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY backend/package*.json ./

## Встановлюємо залежності
RUN npm ci --legacy-peer-deps

## Створюємо папку dist, якщо вона не існує
RUN mkdir -p dist

# Копіюємо весь код проєкту в контейнер
COPY backend/ .

# Збираємо TypeScript-код
RUN npm run build

## Видаляємо .js, .d.ts, .js.map з src/
#RUN find src -type f -name '*.js' -delete -o -name '*.d.ts' -delete -o -name '*.js.map' -delete

# Вказуємо команду для запуску
CMD ["node", "dist/main.js"]