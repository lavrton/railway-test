# Start with a node base image
FROM node:20.8.1-buster-slim

# Install necessary packages for Chromium and other dependencies
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
    libappindicator3-1 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrender1 \
    libxtst6 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    apt-transport-https \
    curl \
    gnupg \
    hicolor-icon-theme \
    libcanberra-gtk* \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    libpangox-1.0-0 \
    libpulse0 \
    libv4l-0 \
    fonts-symbola \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set environment variable to prevent Chromium from using D-Bus
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install npm packages including Puppeteer
RUN npm install

# Copy the rest of your application
COPY . .

# Add health check for Chromium
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 CMD curl --
