const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIRS = ['app', 'components'];
const OLD  = 'http://localhost:5000';
const NEW_API  = "process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'";
const NEW_BASE = "process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'";

// Lines to add at the top of each file (after last import)
const API_CONST  = `const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api';\n`;
const BASE_CONST = `const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';\n`;

function getAllFiles(dir) {
  const results = [];
  if (!fs.existsSync(path.join(ROOT, dir))) return results;
  function walk(d) {
    fs.readdirSync(d).forEach(f => {
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) { walk(full); }
      else if (f.endsWith('.js')) results.push(full);
    });
  }
  walk(path.join(ROOT, dir));
  return results;
}

let totalFixed = 0;

DIRS.forEach(dir => {
  getAllFiles(dir).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes(OLD)) return;

    let needsApi  = content.includes(OLD + '/api');
    let needsBase = content.includes("'" + OLD + "'") || content.includes('"' + OLD + '"');

    // Replace all occurrences of the full API URL
    let updated = content
      .replace(/['"`]http:\/\/localhost:5000\/api['"`]/g, 'API')
      .replace(/http:\/\/localhost:5000\/api/g, '${API}')
      .replace(/['"`]http:\/\/localhost:5000['"`]/g, 'BASE')
      .replace(/http:\/\/localhost:5000/g, '${BASE}');

    // Find insertion point — after the last import line
    const lines = updated.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ') || lines[i].trim() === "'use client';") {
        lastImportIdx = i;
      }
    }

    // Insert const declarations if not already present
    const alreadyHasApi  = updated.includes("const API");
    const alreadyHasBase = updated.includes("const BASE");

    if (lastImportIdx >= 0) {
      const toInsert = [];
      if (needsApi  && !alreadyHasApi)  toInsert.push(API_CONST.trim());
      if (needsBase && !alreadyHasBase) toInsert.push(BASE_CONST.trim());
      if (toInsert.length > 0) {
        lines.splice(lastImportIdx + 1, 0, '', ...toInsert);
        updated = lines.join('\n');
      }
    }

    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`✅ Fixed: ${file.replace(ROOT + '/', '')}`);
      totalFixed++;
    }
  });
});

console.log(`\nDone — fixed ${totalFixed} files.`);
