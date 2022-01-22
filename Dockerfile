FROM node:14.15-alpine

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]