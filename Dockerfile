# Start with a node base image
FROM node:20.8.1

# Set the working directory
WORKDIR /

# Install necessary packages for chromium
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
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

    # Increase the shared memory size
RUN mkdir /mnt/hugepages
RUN mount -t tmpfs -o size=1G tmpfs /mnt/hugepages

# Set the number of file descriptors
RUN ulimit -n 65536

COPY package.json package-lock.json ./

# Install npm packages
RUN npm install

# Copy the rest of your application
COPY . .


# Command to run your application
CMD ["node", "index.mjs"]