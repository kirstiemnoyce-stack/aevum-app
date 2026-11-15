// Downloads the app's image assets from the archived original aevum repo.
//
// Why: this repo was bootstrapped through a text-only file API that cannot
// transport binary data, so the binary image assets are fetched at install
// time from the archived source repo (kirstiemnoyce-stack/aevum, read-only).
// If an asset already exists in public/ it is left untouched.
//
// Runs automatically after `npm install` (see "postinstall" in package.json).
// Override the source base URL with the ASSETS_BASE_URL env var if you mirror
// the originals somewhere else.
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC =
  process.env.ASETS_BASE_URL ||
  "https://raw.githubusercontent.com/kirstiemnoyce-stack/aevum/main";

// public/<name> <- file at the root of the archived aevum repo
const ASSETS = {
  "onboarding-bg.jpg": "onboarding-bg.jpg",
  "partner-connect.jpg": "partner-connect.png",
  "connection-success.jpg": "connection-success.jpg",
  "ai-avatar.png": "ai-avatar.png",
};

async function download(url, dest) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      return;
    } catch (err) {
      lastErr = err;
      if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  throw lastErr;
}

let fetched = 0;
let failed = 0;
for (const [name, src] of Object.entries(ASSETS)) {
  const dest = join(root, "public", name);
  if (existsSync(dest) && statSync(dest).size > 0) continue;
  mkdirSync(dirname(dest), { recursive: true });
  try {
    await download(`${SRC}/${src}`, dest);
    fetched++;
    console.log(`[assets] public/${name} <- aevum/${src}`);
  } catch (err) {
    failed++;
    console.warn(`[assets] WARNING: could not fetch ${name} (${err.message})`);
  }
}
if (failed > 0) {
  console.warn(
    `[assets] ${failed} asset(s) missing — the app will still build, but those images will not display.`
  );
  console.warn("[assets] re-run `npm run assets:fetch` with a working network connection.");
}
if (fetched > 0) {
  console.log(`[assets] done — ${fetched} asset(s) now in public/`);
} else {
  console.log("[assets] all assets already present");
}
