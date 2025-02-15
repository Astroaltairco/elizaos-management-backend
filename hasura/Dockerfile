# Use the official Hasura image as the base
FROM hasura/graphql-engine:v2.45.1-ce.ubuntu

# Set working directory
WORKDIR /hasura

# Install Hasura CLI
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Copy migrations and metadata into the container
COPY hasura /hasura

# Default command: Apply metadata before starting Hasura server
CMD ["sh", "-c", "\
    export HASURA_GRAPHQL_DATABASE_URL=\"$HASURA_GRAPHQL_DATABASE_URL\"; \
    echo 'Starting Hasura Engine...'; \
    graphql-engine serve --enable-console & \
    until curl --silent --fail http://localhost:8080/v1/version; do \
      echo 'Waiting for Hasura Engine to be ready...'; sleep 2; \
    done; \
    echo 'Applying Hasura Migrate...'; \
    hasura migrate apply --endpoint http://localhost:8080 --database-name default --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET --project /hasura && \
    echo 'Applying Hasura Metadata...'; \
    hasura metadata apply --endpoint http://localhost:8080 --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET --project /hasura && \
    echo 'Migrate and Metadata applied successfully! Bringing Hasura Engine to the foreground...'; \
    wait"]