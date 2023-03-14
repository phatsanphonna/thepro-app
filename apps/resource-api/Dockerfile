FROM node:18-slim

WORKDIR /app

EXPOSE 7802

ENV PORT 7802
ENV HOST 0.0.0.0
ENV NODE_ENV production

COPY ../../dist/apps/resource-api .
COPY ../../libs/database/prisma ./prisma
COPY ../../.env.production .

RUN cp .env.production .env

RUN npx prisma generate

CMD node ./index.js
