import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Получаем эквивалент __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке assets
const assetsDir = path.join(__dirname, "public", "assets");

const generateId = (name) => name.toLowerCase().replace(/\s+/g, "_");

function readAssets(dir) {
  const result = {};

  const categories = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  categories.forEach((category) => {
    const categoryPath = path.join(dir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith(".png"));

    result[category] = files.map((file) => ({
      id: generateId(file.replace(".png", "")),
      name: file.replace(".png", ""),
      url: `/assets/${category}/${file}`,
    }));
  });

  return result;
}

const assetsJSON = readAssets(assetsDir);

// Сохраняем в файл
fs.writeFileSync(
  path.join(__dirname, "assets.json"),
  JSON.stringify(assetsJSON, null, 2)
);

console.log("assets.json успешно создан!");
