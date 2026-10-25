import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.resolve(ROOT, 'src/locales');
const BASE_LOCALE = 'es.json';
const OTHER_LOCALES = ['en.json'];

console.log('🌐 [pacho-app i18n:check] Verificando paridad de idiomas...\n');

let hasError = false;

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys = keys.concat(flattenKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const basePath = path.join(LOCALES_DIR, BASE_LOCALE);
if (!fs.existsSync(basePath)) {
  console.error(`❌ Archivo base ${BASE_LOCALE} no encontrado.`);
  process.exit(1);
}

const baseContent = JSON.parse(fs.readFileSync(basePath, 'utf8'));
const baseKeys = flattenKeys(baseContent);
console.log(`ℹ️ Idioma base (${BASE_LOCALE}): ${baseKeys.length} claves registradas.\n`);

for (const file of OTHER_LOCALES) {
  const filePath = path.join(LOCALES_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Archivo faltante: ${file}`);
    hasError = true;
    continue;
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const currentKeys = new Set(flattenKeys(content));

  const missing = baseKeys.filter(k => !currentKeys.has(k));
  const extra = Array.from(currentKeys).filter(k => !baseKeys.includes(k));

  if (missing.length > 0) {
    console.error(`❌ [${file}] Faltan ${missing.length} claves:`);
    missing.forEach(k => console.error(`   - ${k}`));
    hasError = true;
  }

  if (extra.length > 0) {
    console.warn(`⚠️ [${file}] ${extra.length} claves no presentes en base:`);
    extra.forEach(k => console.warn(`   + ${k}`));
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✅ [${file}] 100% de paridad con ${BASE_LOCALE}`);
  }
}

if (hasError) {
  console.error('\n❌ Verificación fallida. Corrige las discrepancias antes de continuar.');
  process.exit(1);
} else {
  console.log('\n✨ Todas las traducciones están sincronizadas con éxito.');
}
