# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml /app/

RUN npm install -g pnpm
RUN pnpm install

# Copy all frontend files
COPY . /app/

RUN pnpm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Run Next.js development server
CMD ["pnpm", "run", "start"]
