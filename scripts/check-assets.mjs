import { open, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDirectory = path.join(root, "public");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else files.push(file);
  }
  return files;
}

async function hasProgressiveIndex(file) {
  const handle = await open(file, "r");
  try {
    const { size } = await handle.stat();
    let offset = 0;
    while (offset + 8 <= size) {
      const header = Buffer.alloc(16);
      await handle.read(header, 0, Math.min(16, size - offset), offset);
      const type = header.toString("ascii", 4, 8);
      if (type === "moov") return true;
      if (type === "mdat") return false;
      let length = header.readUInt32BE(0);
      if (length === 1) length = Number(header.readBigUInt64BE(8));
      if (length < 8) return false;
      offset += length;
    }
    return false;
  } finally {
    await handle.close();
  }
}

const files = [
  ...(await walk(path.join(root, "src"))),
  path.join(root, "index.html"),
];
const references = new Set();
for (const file of files) {
  if (!/\.(tsx?|html|css)$/.test(file)) continue;
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/(["'])(\/.*?)\1/g)) {
    if (/\.(mp4|webp|png|jpe?g|svg|woff2)$/.test(match[2])) {
      references.add(decodeURIComponent(match[2]));
    }
  }
}

for (const reference of references) {
  const file = path.resolve(publicDirectory, `.${reference}`);
  if (!file.startsWith(publicDirectory + path.sep))
    throw new Error(`Caminho inválido: ${reference}`);
  if (!(await stat(file)).isFile())
    throw new Error(`Mídia ausente: ${reference}`);
  if (file.endsWith(".mp4") && !(await hasProgressiveIndex(file))) {
    throw new Error(`Prepare o MP4 com -movflags +faststart: ${reference}`);
  }
}
console.log(
  `${references.size} referências de mídia verificadas; MP4 preparados para reprodução progressiva.`,
);
