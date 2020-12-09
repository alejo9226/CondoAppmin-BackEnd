FROM node:alpine 
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package.json .
RUN yarn install
COPY . .
# ENV CONNECTION_STRING=mongodb://localhost:27017/condoappmin
# ENV SECRET=skjvbdkfgbdjfkbvkdfnvjldfbnln8w934bkvkdhfb
# ENV PORT=8000
EXPOSE 8000
VOLUME /usr/src/app/
CMD ["yarn" , "dev"]
