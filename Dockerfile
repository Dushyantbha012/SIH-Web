# Use the basic Node image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package*.json files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all of the code
COPY . .

# Run Prisma generate
RUN npx prisma generate

#Build the next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variables from .env.local
# Note: Ensure .env.local is in the same directory as the Dockerfile
COPY .env.local .env

# Define the command to start the application
CMD ["npm", "start"]