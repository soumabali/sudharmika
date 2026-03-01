#!/usr/bin/env bash
set -euo pipefail

echo "🔎 Lint"
npm run lint

echo "🔎 Type check"
npm run typecheck

echo "🔎 Unit tests"
npm run test

echo "🔎 Build"
npm run build

echo "✅ Quality gate passed"
