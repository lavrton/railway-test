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
    dbus-x11 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


# Increase the number of file descriptors
RUN echo "root soft nofile 65536" >> /etc/security/limits.conf && \
echo "root hard nofile 65536" >> /etc/security/limits.conf

# Increase the number of processes
RUN echo "root soft nproc 65536" >> /etc/security/limits.conf && \
echo "root hard nproc 65536" >> /etc/security/limits.conf

# Set environment variables for D-Bus
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

COPY package.json package-lock.json ./

# Install npm packages
RUN npm install

# Copy the rest of your application
COPY . .


# Command to run your application
CMD ["node", "index.mjs"]