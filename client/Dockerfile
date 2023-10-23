FROM node as common-build-stage

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

# development stage
FROM common-build-stage as development-build-stage
ENV NODE_ENV development
CMD npm run dev

# test stage
FROM common-build-stage as test-build-stage
ENV NODE_ENV test
CMD npm run test

# production stage
FROM common-build-stage as production-build-stage
ENV NODE_ENV production
RUN npm run build
CMD npm run start
