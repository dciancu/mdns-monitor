#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR"

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USERNAME" --password-stdin

image_name="${DOCKER_IMAGE:-dciancu/mdns-monitor}"

if [[ -n "${CIRCLE_BRANCH+x}" ]] && [[ "$CIRCLE_BRANCH" == 'test' ]]; then
    docker push "${image_name}:test"
else
    docker rmi "${image_name}:test" 2>/dev/null || true
    docker push --all-tags "$image_name"
fi
