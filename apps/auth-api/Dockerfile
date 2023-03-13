FROM node:18-slim

WORKDIR /app

EXPOSE 7801

COPY ../../ .

RUN npx prisma generate

CMD node ./dist/apps/auth-api/index.js
