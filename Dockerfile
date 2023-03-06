FROM node:17

WORKDIR /app

COPY . .
COPY prisma ./prisma/

# RUN apk add --no-cache python3 make g++

RUN npm install
RUN npx prisma generate
RUN npm run build

CMD ["yarn", "start"]
