#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Run any pending migrations
bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:create db:migrate

# Load seeds
bundle exec rails db:seed 2>/dev/null || echo "Seeds already loaded"

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"

