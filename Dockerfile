FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ENV NODE_ENV=production

RUN pnpm exec prisma migrate deploy
RUN pnpm exec prisma generate

EXPOSE 8000

CMD ["pnpm", "start"]
