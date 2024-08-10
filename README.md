# Установка зависимостей
`pnpm install`

# Переменные окружения
Должны быть в файле `.env` (example для примера)

# Запуск миграций
`pnpm migrate up`

# Запуск в dev режиме
`pnpm start:dev`

По умолчанию приложение доступно по адресу http://localhost:3335/

Swagger доступен на: http://localhost:3335/docs/

# Сборка
`pnpm build:prod`

# Запуск собранного приложения
`pnpm start:prod`

# Либо через docker
`docker compose up -d`