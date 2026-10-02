// Next.js 静的エクスポートの補完スクリプト。
// out/<route>.html を out/<route>/index.html にも複製し、
// ディレクトリ形式のURL（/text/zenkaku-hankaku/ など）で
// 配信できるようにする。Cloudflare Pages のクリーンURL
// （/foo -> foo.html）にも影響しない。
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const OUT_DIR = "out";
const SKIP = new Set(["index", "404", "_not-found"]);

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      walk(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const base = basename(entry.name, ".html");
      if (SKIP.has(base)) continue;
      const targetDir = join(dirname(full), base);
      if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
      const target = join(targetDir, "index.html");
      copyFileSync(full, target);
      console.log(`copied ${full} -> ${target}`);
    }
  }
}

walk(OUT_DIR);
