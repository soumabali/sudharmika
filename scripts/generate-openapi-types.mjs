import fs from "node:fs/promises";
import openapiTS from "openapi-typescript";

const schemaUrl = process.env.LARAVEL_OPENAPI_URL || "http://localhost:8000/docs/v1/openapi.yaml";
const outputPath = "src/lib/api/generated/openapi.d.ts";

const output = await openapiTS(schemaUrl);
await fs.writeFile(
  outputPath,
  ["/* eslint-disable */", "// AUTO-GENERATED. DO NOT EDIT MANUALLY.", "", output, ""].join("\n"),
  "utf8",
);
console.log(`✅ OpenAPI types generated: ${outputPath}`);
