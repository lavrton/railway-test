# Start with a node base image
FROM node:20.8.1

# Set the working directory
WORKDIR /

# Install necessary packages for chromium and tini
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    tini \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

# Install npm packages
RUN npm install

# Copy the rest of your application
COPY . .

# Add the entry point script to the container
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

# Use the script as the entry point
ENTRYPOINT ["/entrypoint.sh"]

# Command to run your application
CMD ["node", "index.mjs"]