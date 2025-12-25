# use the offical node.js image
FROM node:18

# working dir in container
WORKDIR /usr/src/app

# install devps
COPY package.json ./
RUN npm install


# copy the application code 
COPY . .

# expose backend port
EXPOSE 5000

CMD ["npm", "start"]
