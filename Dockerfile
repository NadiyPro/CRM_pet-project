# Використовуємо Node.js як базовий образ
FROM node:20-alpine

# Створюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Ініціалізуємо Husky (якщо необхідно)
RUN npx husky install

# Копіюємо весь код проекту
COPY . .

# Вказуємо команду для запуску контейнера
CMD ["npm", "start"]

# Відкриваємо порт для доступу до додатку
EXPOSE 3000