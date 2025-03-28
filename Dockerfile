# Використовуємо офіційний образ Nodejs
FROM node:20-alpine

# Встановлюємо необхідні пакети
# Додаємо Git, бо Husky його потребує
RUN apk add --no-cache make g++ git

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json, package-lock.json та інші необхідні конфігураційні файли
COPY ./backend/package.json ./backend/package-lock.json /app/

# Встановлюємо залежності
RUN npm ci --legacy-peer-deps

# Копіюємо весь код проєкту в контейнер
COPY backend/ /app/

# Видаляємо старий білд (на випадок залишкових файлів)
RUN rm -rf dist

# Збираємо TypeScript-код
RUN npm run build

# Вказуємо команду для запуску
CMD ["node", "dist/src/main.js"]