# Start with a node base image
FROM node:20.8.1

# Set the working directory
WORKDIR /

# Install necessary packages for chromium and D-Bus
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
    dbus \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./

# Install npm packages
RUN npm install

# Copy the rest of your application
COPY . .

# Increase process limits
RUN echo "root soft nproc 4096" >> /etc/security/limits.conf && \
    echo "root hard nproc 8192" >> /etc/security/limits.conf && \
    echo "root soft nofile 4096" >> /etc/security/limits.conf && \
    echo "root hard nofile 8192" >> /etc/security/limits.conf

# Ensure D-Bus service is running
RUN dbus-uuidgen > /var/lib/dbus/machine-id

# Command to run your application
CMD ["sh", "-c", "dbus-daemon --system --fork && node index.mjs"]
