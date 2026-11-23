// The One-Line Laugh — a single funny line, written to /output/entry.txt.
//
// The line: an everyday truth (houseplants die on everyone) with the
// surprise saved for the very end — the plant is disappointed in us too.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I bought a plant to prove I could keep something alive, and now we sit there quietly disappointing each other, one leaf at a time.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and it has to stand alone as a single sentence.
function validate(line: string): void {
  if (line.length === 0 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
  // Single sentence: exactly one sentence-ending mark, at the very end.
  const endings = line.match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !line.endsWith(".")) {
    throw new Error("line must be a single sentence ending in a period");
  }
}

validate(LINE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });

// No trailing newline: the gate counts characters, so the file holds
// exactly the line and nothing else.
writeFileSync(outPath, LINE, "utf8");

// Read it back and verify byte-identical before reporting success.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: output differs from the line");
}

console.log(`Wrote ${LINE.length} characters to ${outPath}`);
console.log(LINE);
