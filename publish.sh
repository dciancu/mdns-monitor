#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR"

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USERNAME" --password-stdin

image_name="${DOCKER_IMAGE:-dciancu/mdns-monitor}"

function pushManifest() {
    docker manifest create "$1" \
        --ammend "${1}-arm" \
        --ammend "${1}-x86"
    docker manifest push "$1"
}

if [[ -n "${CIRCLE_BRANCH+x}" ]] && [[ "$CIRCLE_BRANCH" == 'test' ]]; then
    pushManifest "${image_name}:test"
else
    version="$(tr -d '\n' < VERSION.txt)"
    pushManifest "${image_name}:latest"
    pushManifest "${image_name}:${version}"
fi

