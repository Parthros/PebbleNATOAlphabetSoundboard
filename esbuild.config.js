import fs from "fs/promises";
import path from "path";
import esbuild from "esbuild";

const srcDir = "./src/embeddedjs";

const mainPath = path.join(srcDir, "main.ts");
const underscoreMainPath = path.join(srcDir, "_main.ts");

//check if main.ts exists and _main.ts does not exist, rename main.ts to _main.ts
const mainExists = await fs
  .access(mainPath)
  .then(() => true)
  .catch(() => false);

const underscoreExists = await fs
  .access(underscoreMainPath)
  .then(() => true)
  .catch(() => false);

if (mainExists && !underscoreExists) {
  await fs.rename(mainPath, underscoreMainPath);
}
else if(underscoreExists && mainExists) {
    throw new Error("Both main.ts and _main.ts exist. Please resolve this conflict before running the build.");
}


await esbuild.build({
  entryPoints: [underscoreMainPath],
  bundle: true,
  format: "esm",
  outfile: "./src/embeddedjs/main.js",

  // Mark Moddable SDK modules as external
  external: [
    "commodetto/*",
    "pebble/*"
  ],

  // Use neutral platform: do not wrap imports with require()
  platform: "neutral",  

  loader: {
    ".ts": "ts",
  },

 
});