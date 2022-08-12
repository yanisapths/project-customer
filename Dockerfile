FROM node:14

WORKDIR  /olive_frontend

COPY . .

RUN npm install

COPY . /olive_frontend

RUN npm run build 

EXPOSE 3000

CMD  ["npm","start"]