#!/bin/sh
set -e

# Fix volume mount permissions (runs as root)
mkdir -p data/assets data/exports
chown -R nextjs:nodejs data

# Drop to nextjs user and run the app
exec su-exec nextjs sh scripts/migrate-and-start.sh
