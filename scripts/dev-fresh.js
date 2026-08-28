const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next cache");
}

console.log("Starting dev server…");
execSync("npx next dev", { stdio: "inherit", cwd: root });
