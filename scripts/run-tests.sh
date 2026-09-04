#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

docker compose up -d --wait

set -a
# shellcheck disable=SC1091
source .env.test
set +a

npm run migrate:up
exec npx mocha --import=tsx 'test/**/*.test.ts'
