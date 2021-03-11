FROM node:12.20.2

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src /app/src

RUN npm install
RUN npm run build

CMD ["npm", "run" , "start:prod"]