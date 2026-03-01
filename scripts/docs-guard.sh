#!/usr/bin/env bash
set -euo pipefail

for file in \
  docs/PRODUCT_REQUIREMENTS.md \
  docs/PRODUCT_CHANGELOG.md \
  docs/ARCH_DECISIONS.md \
  docs/BUSINESS_FLOW.md; do
  [[ -f "$file" ]] || { echo "❌ Missing $file"; exit 1; }
done

grep -q "NEXT_PUBLIC_API_BASE_URL" .env.example || { echo "❌ .env.example missing NEXT_PUBLIC_API_BASE_URL"; exit 1; }

echo "✅ Docs guard passed"
