# Use the Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire frontend codebase
COPY . .

# Expose the port the React app runs on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
