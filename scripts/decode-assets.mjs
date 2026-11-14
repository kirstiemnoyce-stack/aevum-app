// Decodes base64-encoded image assets into public/.
// The GitHub file API used to bootstrap this repo cannot transport binary,
// so images ship as base64 text and are restored here (runs on npm install).
// Large images are split into ordered part files listed in assets/manifest.json;
// part lists are concatenated before decoding.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, "assets", "manifest.json"), "utf8"));

let restored = 0;
for (const [name, entry] of Object.entries(manifest)) {
  const dest = join(root, "public", name);
  if (existsSync(dest)) continue;
  const parts = Array.isArray(entry) ? entry : [entry];
  const b64 = parts.map((p) => readFileSync(join(root, p), "utf8").trim()).join("");
  writeFileSync(dest, Buffer.from(b64, "base64"));
  restored++;
}
if (restored > 0) {
  console.log(`[assets] restored ${restored} image(s) into public/`);
}
