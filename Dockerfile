# Base image
FROM node:16.20.0-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the project files to the container
COPY . .
COPY ./.env.dist ./.env

# Build the React app
RUN npm run build

# Production-ready image
FROM nginx:1.25.1-alpine

# Copy the built React app from the build stage to the NGINX web server
COPY --from=build /app/build /usr/share/nginx/html

# Copy the NGINX configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
