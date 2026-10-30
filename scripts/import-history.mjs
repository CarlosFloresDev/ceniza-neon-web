import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const game = process.argv[2];
if (!game)
  throw new Error('Uso: node scripts/import-history.mjs "RUTA_DEL_JUEGO"');
const git = [
  "-C",
  path.resolve(game),
  "-c",
  `safe.directory=${path.resolve(game).replaceAll("\\", "/")}`,
];
const raw = execFileSync(
  "git",
  [...git, "log", "--format=%H%x1f%aI%x1f%cI%x1f%s"],
  { encoding: "utf8" },
);
const commits = raw
  .trimEnd()
  .split("\n")
  .map((line) => {
    const [sha, authoredAt, committedAt, subject] = line.split("\x1f");
    return { sha, authoredAt, committedAt, subject };
  });
const snapshotDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Lima",
}).format(new Date());
await fs.writeFile(
  "content/development-history.json",
  JSON.stringify(
    {
      source:
        "Current game branch history; author dates preserved; no inferred dates",
      repository: "https://github.com/chefsitturchey-web/Ceniza-ne-n",
      snapshotDate,
      commits,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `${commits.length} commits recorded. The game checkout was only read.`,
);
