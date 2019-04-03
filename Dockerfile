FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

# Install dependencies
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose port 3001 to listen on
EXPOSE 3001

# Use docker config file
ENV NODE_ENV=docker

# Run tests
RUN npm test

# Start server
CMD [ "npm", "start" ]