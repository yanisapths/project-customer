FROM node:14

RUN mkdir /olive_frontend 

WORKDIR  /olive_frontend

COPY ./package.json /olive_frontend

RUN npm install

COPY . /olive_frontend

RUN npm run build 

EXPOSE 3000

CMD  ["npm","start"]