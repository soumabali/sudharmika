import { execSync } from 'node:child_process';

const input =
  process.env.LARAVEL_OPENAPI_URL ||
  '../vibe-starterkit/docs/api/openapi.yaml';

const output = 'src/lib/api/generated';

const cmd = `npx openapi-ts -i ${JSON.stringify(input)} -o ${JSON.stringify(output)} -s`;

console.log(`🔧 Generate API client from: ${input}`);
execSync(cmd, { stdio: 'inherit' });
console.log(`✅ API client generated at: ${output}`);
