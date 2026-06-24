#!/usr/bin/env bash
# Build caffeinatedweb for Hostinger (or any Node host) using Next standalone.
# Produces a self-contained folder you upload: .next/standalone
set -euo pipefail

# Defaults — override by setting these env vars before running, e.g.
#   NEXT_PUBLIC_SITE_URL=https://yourdomain.com NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc ./scripts/build-standalone.sh
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://caffeinatedweb.com}"
export NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="${NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:-}"

echo "Building for ${NEXT_PUBLIC_SITE_URL} ..."
npm run build

# Standalone does not include static assets or the public folder; copy them in.
echo "Bundling static assets and public/ into standalone ..."
rm -rf .next/standalone/.next/static
cp -R .next/static .next/standalone/.next/static
rm -rf .next/standalone/public
cp -R public .next/standalone/public

echo "Done. Upload the contents of .next/standalone/ to Hostinger."
echo "On hPanel > Node.js: Node 20, startup file server.js, app root = uploaded folder."
echo "Set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the app env vars."
