import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PACHO_REPO = path.resolve(ROOT, '../pacho');
const OUTPUT_FILE = path.resolve(ROOT, 'src/data/app-features.json');

console.log('🔄 [sync-app-data] Sincronizando datos desde el repositorio pacho...\n');

if (!fs.existsSync(PACHO_REPO)) {
  console.warn('⚠️ No se encontró el repositorio local ../pacho. Saltando sincronización.');
  process.exit(0);
}

try {
  // 1. Leer versión y metadata de pacho/package.json
  const pachoPkgPath = path.join(PACHO_REPO, 'package.json');
  let appVersion = '1.0.0';
  if (fs.existsSync(pachoPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pachoPkgPath, 'utf8'));
    appVersion = pkg.version || appVersion;
  }

  // 2. Leer documentos de features en 02-DOCS
  const docsDir = path.join(PACHO_REPO, '02-DOCS');
  const recentFeatures = [];
  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md') && f.startsWith('ftd-'));
    for (const file of files.slice(0, 8)) {
      const title = file
        .replace(/^ftd-/, '')
        .replace(/\.md$/, '')
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      recentFeatures.push({
        id: file.replace('.md', ''),
        title,
        docFile: file,
      });
    }
  }

  // 3. Comprobar estado de mobile
  const mobilePubspec = path.join(PACHO_REPO, 'mobile/pubspec.yaml');
  let mobileReady = false;
  let mobileVersion = '0.1.0';
  if (fs.existsSync(mobilePubspec)) {
    mobileReady = true;
    const content = fs.readFileSync(mobilePubspec, 'utf8');
    const match = content.match(/version:\s*([^\s]+)/);
    if (match) mobileVersion = match[1];
  }

  const payload = {
    syncedAt: new Date().toISOString(),
    appVersion,
    mobile: {
      ready: mobileReady,
      version: mobileVersion,
    },
    featuresCount: recentFeatures.length,
    recentFeatures,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`✅ Sincronización exitosa: ${recentFeatures.length} features registradas (Pacho App v${appVersion}).`);
} catch (err) {
  console.error('❌ Error durante la sincronización:', err);
  process.exit(1);
}
