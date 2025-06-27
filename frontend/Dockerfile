# --- ЭТАП 1: "Черновая Мастерская" (Сборка проекта) ---
# Мы берем полный образ Node.js, в котором есть все инструменты для компиляции
FROM node:18 AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем сначала только package.json, чтобы Docker мог кэшировать установку зависимостей
COPY package*.json ./

# Устанавливаем все зависимости из package.json
RUN npm install

# Копируем весь остальной код нашего приложения (pages, components и т.д.)
COPY . .

# Запускаем команду сборки, которая создает оптимизированную версию сайта в папке .next
RUN npm run build


# --- ЭТАП 2: "Чистый Шоурум" (Финальный образ для запуска) ---
# Теперь мы берем маленький, чистый и надежный образ 'slim' на базе Debian
FROM node:18-slim as runner

# Устанавливаем curl для возможной диагностики в будущем
RUN apt-get update && apt-get install -y curl --no-install-recommends

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем из "Мастерской" (builder) только то, что нужно для запуска, а не для сборки
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Указываем, какой порт будет слушать наше приложение
EXPOSE 3000

# Команда, которая запустит наш сайт в продакшн-режиме
CMD ["npm", "start"]