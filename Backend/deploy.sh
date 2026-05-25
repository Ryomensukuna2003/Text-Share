#!/usr/bin/env bash
# Deploy the Text-Share backend to Fly.io after Neon DB is ready.
# Usage:
#   1. Sign in:        fly auth login
#   2. Export your Neon connection string (full URL with sslmode=require):
#      export NEON_URL="postgresql://USER:PASS@HOST/DB?sslmode=require"
#   3. (Optional) Set Vercel origin(s) for CORS, comma-separated:
#      export CORS_ORIGINS="https://your-app.vercel.app"
#   4. Run:            ./deploy.sh

set -euo pipefail

if [[ -z "${NEON_URL:-}" ]]; then
  echo "ERROR: NEON_URL is not set. Get it from neon.tech project dashboard."
  exit 1
fi

cd "$(dirname "$0")"

# Parse the Neon connection string into Fly secrets.
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
proto_stripped="${NEON_URL#*://}"
userpass="${proto_stripped%%@*}"
hostpart="${proto_stripped#*@}"

DB_USER="${userpass%%:*}"
PASSWORD="${userpass#*:}"

hostpath="${hostpart%%\?*}"
HOSTPORT="${hostpath%%/*}"
DATABASE="${hostpath#*/}"

if [[ "$HOSTPORT" == *":"* ]]; then
  HOST="${HOSTPORT%%:*}"
  DB_PORT="${HOSTPORT#*:}"
else
  HOST="$HOSTPORT"
  DB_PORT="5432"
fi

echo "→ Parsed Neon connection:"
echo "  HOST=$HOST"
echo "  DATABASE=$DATABASE"
echo "  DB_USER=$DB_USER"
echo "  DB_PORT=$DB_PORT"
echo ""

# Make sure an app exists; create if needed (uses name from fly.toml).
APP_NAME="$(grep -E '^app = ' fly.toml | head -n1 | sed 's/app = "\(.*\)"/\1/')"
if ! fly status -a "$APP_NAME" >/dev/null 2>&1; then
  echo "→ Creating Fly app '$APP_NAME' in bom (Mumbai)..."
  fly apps create "$APP_NAME" --org personal
fi

echo "→ Setting secrets on Fly..."
fly secrets set \
  DB_USER="$DB_USER" \
  PASSWORD="$PASSWORD" \
  HOST="$HOST" \
  DATABASE="$DATABASE" \
  DB_PORT="$DB_PORT" \
  ${CORS_ORIGINS:+CORS_ORIGINS="$CORS_ORIGINS"} \
  -a "$APP_NAME" \
  --stage

echo "→ Deploying..."
fly deploy -a "$APP_NAME" --remote-only

echo ""
echo "✓ Done. URL:"
fly info -a "$APP_NAME" | grep -E 'Hostname|URL' || true
echo ""
echo "Test it:  curl https://$APP_NAME.fly.dev/"
