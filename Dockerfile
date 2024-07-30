from node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY . .

COPY --from=build /app/dist ./dist

RUN rm -rf src

EXPOSE 3000

CMD ["node", "dist/main.js"]