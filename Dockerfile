# Використовуємо офіційний образ Node.js
FROM node:20-alpine

# Встановлюємо необхідні пакети
RUN apk add --no-cache make g++

# Встановлюємо робочу директорію в контейнері (локальна папка backend буде відображатися у контейнері як /app)
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
# (враховуючи, що в контейнері backend/ стає /app,
# CMD повинен виглядати dist/src/main.js,
# оскільки, dist/src/main.js знаходиться в середині контейнера /app,
# а ми його встановили як робочу диреторію, тобто доступились до нього WORKDIR /app)
CMD ["node", "dist/src/main.js"]