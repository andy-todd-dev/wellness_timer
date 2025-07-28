ARG VARIANT="22-bullseye"
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends  \
    libgtk2.0-0 \ 
    libgtk-3-0 \ 
    libgbm-dev \ 
    libnotify-dev \ 
    libnss3 \ 
    libxss1 \ 
    libasound2 \ 
    libxtst6 \ 
    xauth \ 
    xvfb

RUN su node -c "npm i -g wait-on"
RUN su node -c "npm i -g netlify-cli"
RUN su node -c "npx cypress install"