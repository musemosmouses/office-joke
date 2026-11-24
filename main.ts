// One-Line Office Joke entry — writes the joke to entry.txt.
// The joke (103 chars, one line, one sentence): the calendar feature meant
// to protect focus time gets booked over by the manager, who even names
// the invasion a "focus" sync. Specific, fresh, instantly recognisable.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";

const entry =
  "My calendar blocked 'focus time' so my manager booked over it and titled the invite 'Quick Focus Sync.'";

// The gate wants 1-200 chars of UTF-8 text, a single line, not only whitespace.
if (entry.length < 1 || entry.length > 200 || entry.trim().length === 0) {
  throw new Error(`entry must be 1-200 chars, got ${entry.length}`);
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

writeFileSync("entry.txt", entry + "\n", "utf8");
console.log(`wrote entry.txt (${entry.length} chars)`);

// The harness scores /output/entry.txt, so mirror the entry there too
// whenever the output directory exists (local runs may not have it).
if (existsSync("/output")) {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry + "\n", "utf8");
}
