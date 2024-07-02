# Use the official Node.js image.
FROM node:21.7.1

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 8080
EXPOSE 4000

# Run the server script
CMD ["node", "server.ts"]
