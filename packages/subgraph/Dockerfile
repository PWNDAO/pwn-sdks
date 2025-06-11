FROM --platform=linux/x86_64 ubuntu:22.04

ARG DEBIAN_FRONTEND=noninteractive

ENV ARGS=""

RUN apt update \
  && apt install -y sudo curl postgresql postgresql-contrib
  
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - \
  && sudo apt-get install -y nodejs

RUN curl -OL https://github.com/LimeChain/matchstick/releases/download/0.6.0/binary-linux-22 \
  && chmod a+x binary-linux-22

WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json* .

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

CMD ../binary-linux-22 ${ARGS}
