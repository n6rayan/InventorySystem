FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

# Expose port 3001 to listen on
EXPOSE 3001

# Run tests
RUN npm test

# Start server
CMD [ "npm", "start" ]