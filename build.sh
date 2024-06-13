#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR"

image_name="${DOCKER_IMAGE:-dciancu/mdns-monitor}"

if [[ -n "${CIRCLE_BRANCH+x}" ]] && [[ "$CIRCLE_BRANCH" == 'test' ]]; then
    docker build -t "${image_name}:test" --pull .
else
    if [[ -n "${CIRCLE_BRANCH+x}" ]] && [[ "$CIRCLE_BRANCH" == 'build' ]]; then
        docker images | grep "$image_name" | tr -s ' ' | cut -d ' ' -f 2 \
            | xargs -I {} docker rmi "${image_name}:{}" || true
    fi

    version="$(tr -d '\n' < VERSION.txt)"
    docker build -t "$image_name" --pull .
    docker tag "$image_name" "${image_name}:${version}"
fi
