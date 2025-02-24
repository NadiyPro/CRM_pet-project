# Використовуємо офіційний образ Node.js
FROM node:20-alpine

# Встановлюємо необхідні пакети
RUN apk add --no-cache make g++

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json і package-lock.json у контейнер
COPY package*.json ./

# Встановлюємо залежності
RUN npm install --legacy-peer-deps

# Копіюємо весь код проєкту в контейнер
COPY . .

# Збираємо TypeScript-код (якщо у вас є TypeScript)
RUN npm run build

# Команда для запуску програми
CMD ["node", "dist/src/main.js"]