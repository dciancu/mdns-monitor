FROM debian:stable-slim

SHELL ["/usr/bin/env", "bash", "-c"]

ARG DEBIAN_FRONTEND='noninteractive'

WORKDIR /root

RUN --mount=target=/var/lib/apt/lists,type=cache --mount=target=/var/cache/apt,type=cache \
    set -euo pipefail \
    && apt-get update \
    && apt-get install -y apt-transport-https ca-certificates \
    && sed -i 's/http:/https:/g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get dist-upgrade -y \
    && apt-get --purge autoremove -y \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

COPY src/ /opt/src/

RUN adduser --gecos '' --shell /bin/bash --disabled-password --disabled-login mdns-monitor \
    && su -l -c 'node -v' mdns-monitor \
    && corepack enable \
    && su -l -c 'yarn -v' mdns-monitor \
    && chown -R mdns-monitor /opt/src \
    && su -l -c 'cd /opt/src && yarn install' mdns-monitor \
    && chown -R root /opt/src

USER mdns-monitor
WORKDIR /
CMD ["node", "/opt/src/index.js"]
