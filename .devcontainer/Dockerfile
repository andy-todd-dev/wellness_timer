ARG VARIANT="22-bullseye"
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends chromium chromium-sandbox

RUN su node -c "npm i -g lighthouse"