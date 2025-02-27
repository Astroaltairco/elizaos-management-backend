#!/bin/bash

# Define variables

ECR_REPO="registry.digitalocean.com/socialdao-backend-hasura"
EXPRESS_IMAGE_NAME="elizaos-express"
EXPRESS_TAG="v1.0.12"

# Step 1: Authenticate Docker with AWS ECR
echo "Authenticating Docker with ECR..."
doctl registry login

# Step 3: Build and Push Express Image
echo "Building and pushing Express image..."
docker buildx build --platform linux/amd64 -t ${EXPRESS_IMAGE_NAME}:${EXPRESS_TAG} -f ./Dockerfile --load .
docker tag ${EXPRESS_IMAGE_NAME}:${EXPRESS_TAG} ${ECR_REPO}/elizaos/express:${EXPRESS_TAG}
docker push ${ECR_REPO}/elizaos/express:${EXPRESS_TAG}


