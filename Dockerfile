<<<<<<< HEAD
=======

>>>>>>> f0650128c413311221379634ebd8db13e820433b
FROM node:alpine 
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 8000
VOLUME /usr/src/app/
CMD ["yarn" , "dev"]
<<<<<<< HEAD
=======

>>>>>>> f0650128c413311221379634ebd8db13e820433b
