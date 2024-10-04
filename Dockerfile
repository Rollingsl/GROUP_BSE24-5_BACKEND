# Step 1: Use Node.js as the base image
FROM node:20-alpine

# Step 2: Install pnpm globally
RUN npm install -g pnpm

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Copy package.json and pnpm-lock.yaml to install dependencies first (caching layer)
COPY package.json pnpm-lock.yaml ./

# Step 5: Install the application dependencies
RUN pnpm install --prod

# Step 6: Copy the rest of the application files to the working directory
COPY . .

# Step 7: Set environment variables (Make sure to provide these in production or Docker Compose)
ENV NODE_ENV=production

# Step 8: Expose the port your backend is running on (3000 in this case)
EXPOSE 8000

# Step 9: Start the application
CMD ["pnpm", "start"]
