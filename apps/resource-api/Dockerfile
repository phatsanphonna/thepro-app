FROM node:18-slim

WORKDIR /app

EXPOSE 7802

COPY ../../ .

RUN npx prisma generate

CMD node ./dist/apps/resource-api/index.js
