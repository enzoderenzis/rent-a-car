# Base image
FROM node:18.18.2-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the desired port (change 3000 to the appropriate port if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]