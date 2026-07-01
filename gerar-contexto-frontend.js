// node gerar-contexto-frontend.js

const fs = require("fs");
const path = require("path");

const outputFile = "contexto_frontend.md";

const allowedExtensions = [".html", ".css", ".js", ".json"];
const ignoredFolders = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".vscode"
];

const ignoredFiles = [
  outputFile,
  "gerar-contexto-frontend.js",
  "package-lock.json"
];

let content = "# Contexto do Projeto Frontend\n\n";
content += "Este arquivo contém a estrutura e o código-fonte principal do frontend do projeto.\n\n";

function shouldIgnore(filePath) {
  const parts = filePath.split(path.sep);

  return parts.some(part => ignoredFolders.includes(part));
}

function getLanguage(extension) {
  switch (extension) {
    case ".html":
      return "html";
    case ".css":
      return "css";
    case ".js":
      return "javascript";
    case ".json":
      return "json";
    default:
      return "";
  }
}

function scanDirectory(directory) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const fullPath = path.join(directory, item);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (shouldIgnore(relativePath)) return;
    if (ignoredFiles.includes(item)) return;

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      scanDirectory(fullPath);
      return;
    }

    const extension = path.extname(item);

    if (!allowedExtensions.includes(extension)) return;

    const language = getLanguage(extension);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    content += `## Arquivo: ${relativePath}\n`;
    content += `\`\`\`${language}\n`;
    content += fileContent;
    content += `\n\`\`\`\n\n`;
  });
}

scanDirectory(process.cwd());

fs.writeFileSync(outputFile, content, "utf8");

console.log(`Arquivo gerado com sucesso: ${outputFile}`);