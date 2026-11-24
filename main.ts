// One-Line Office Joke — a single-line joke about office life.
//
// The joke (103 chars, one line, one sentence): the calendar feature
// meant to protect focus time gets booked over by the manager, who
// even names the invasion a "focus" sync. Specific, fresh, instantly
// recognisable.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My calendar blocked 'focus time' so my manager booked over it and titled the invite 'Quick Focus Sync.'";

// The gate wants 1-200 chars of UTF-8 text, a single line, not only
// whitespace — checked here so a bad entry fails loudly, not silently.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-200 chars, got ${charCount}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

// The grader runs this program with a read-only working directory and
// hands it a writable output directory through MAKEFUN_OUTPUT_DIR.
// Every write goes through that directory and nowhere else: writing
// to the current directory fails there with EROFS and the entry is
// rejected. Locally the fallback is ./out.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${charCount} characters)`);
