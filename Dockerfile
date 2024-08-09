FROM node:18
WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm build:prod
CMD ["pnpm", "run", "start:prod"]