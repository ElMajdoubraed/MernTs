FROM node

WORKDIR /usr/src/app

# clear cache
# RUN npm cache clean --force
# delete node_modules folder if it exists
# RUN rm -rf node_modules

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 2000

CMD ["npm", "start"]