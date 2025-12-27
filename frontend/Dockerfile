# Stage 1 - Building App # use the offical node.js image for building React app
FROM node:18 AS build

# working dir in container
WORKDIR /app

# install devps
COPY package.json ./
RUN npm install

# copy the application code 
COPY . .
RUN npm run build

# Stage 2 - Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80



