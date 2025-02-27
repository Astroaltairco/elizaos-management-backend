#!/bin/bash

# Define variables

ECR_REPO="registry.digitalocean.com/socialdao-backend-hasura"
HASURA_IMAGE_NAME="elizaos-hasura"
HASURA_TAG="v1.0.6"

# Step 1: Authenticate Docker with AWS ECR
echo "Authenticating Docker with ECR..."
doctl registry login

# Step 2: Build and Push Hasura Image
echo "Building and pushing Hasura image..."
docker buildx build --platform linux/amd64 -t ${HASURA_IMAGE_NAME}:${HASURA_TAG} -f ./hasura/Dockerfile --load .
docker tag ${HASURA_IMAGE_NAME}:${HASURA_TAG} ${ECR_REPO}/elizaos/hasura:${HASURA_TAG}
docker push ${ECR_REPO}/elizaos/hasura:${HASURA_TAG}


