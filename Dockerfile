# Використовуємо Node.js як базовий образ
FROM node:20-alpine

# Встановлюємо додаткові пакети для коректної роботи npm
RUN apk add --no-cache python3 make g++

# Створюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Очищуємо кеш npm та встановлюємо залежності
RUN npm cache clean --force && npm install --legacy-peer-deps

# Копіюємо весь код проекту
COPY . .

# Компілюємо TypeScript у JavaScript
RUN npm run build

# Відкриваємо порт
EXPOSE 3000

# Вказуємо команду для запуску додатку
CMD ["npm", "start:prod"]