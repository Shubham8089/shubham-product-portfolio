import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";

const DIRS = [
  { dir: "public/images/clients", maxWidth: 1200, quality: 78 },
];

async function compressDir({ dir, maxWidth, quality }) {
  const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const before = (await stat(fullPath)).size;
    const buffer = await sharp(fullPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    const newName = file.replace(/\.(png|jpe?g)$/i, ".jpg");
    const newPath = path.join(dir, newName);
    const tmpPath = newPath + ".tmp";
    await sharp(buffer).toFile(tmpPath);

    const { unlink, rename } = await import("fs/promises");
    if (newName !== file) {
      await unlink(fullPath);
    }
    await rename(tmpPath, newPath);

    const after = (await stat(newPath)).size;
    totalBefore += before;
    totalAfter += after;
    console.log(
      `${file} -> ${newName}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );
  }

  console.log(
    `\n${dir}: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB\n`
  );
}

for (const d of DIRS) {
  await compressDir(d);
}
