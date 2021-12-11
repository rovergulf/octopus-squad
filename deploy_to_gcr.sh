#!/usr/bin/env bash

REGISTRY_IMAGE="${OCI_MAIN_ROVERGULF}/octopus-squad"
VERSION=v$(cat ./package.json | grep version | awk '{print $2}' | tr -d \"\,)

echo "[$(date +%T)] start deploying ${REGISTRY_IMAGE}:${VERSION} image"
docker build --no-cache -t $REGISTRY_IMAGE:$VERSION -t $REGISTRY_IMAGE:latest -t $REGISTRY_IMAGE:stable . || exit 1
echo "[$(date +%T)] Image ${REGISTRY_IMAGE}:${VERSION} has built. deploying..."
docker push $REGISTRY_IMAGE:$VERSION || exit 2
docker push $REGISTRY_IMAGE:latest || exit 3
echo "[$(date +%T)] Image ${REGISTRY_IMAGE}:${VERSION} successfully deployed."
