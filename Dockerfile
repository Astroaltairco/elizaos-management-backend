# Use Node.js base image
FROM node:20

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code, including `src`
COPY . .

# Build the TypeScript code
# RUN npm run build
# Expose the application port
EXPOSE 4000

# Start the application
CMD ["sh", "-c", "npm run start"]
