/**
 * Legt in den alten Einzel-Repos eine Weiterleitungsseite auf die neue,
 * konsolidierte Adresse an — damit schon verschickte Links weiterlaufen.
 *
 *   node scripts/make-redirects.mjs                 # Vorschau, schreibt nichts
 *   node scripts/make-redirects.mjs --write         # schreibt die Stubs
 *   node scripts/make-redirects.mjs --write --base https://demos.movec.services
 *
 * Nach dem Umstellen auf die Custom Domain einfach mit neuer --base erneut
 * laufen lassen und die Repos pushen.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const VIBECODE = resolve(HERE, '..', '..');

const args = process.argv.slice(2);
const write = args.includes('--write');
const baseIdx = args.indexOf('--base');
const BASE = (baseIdx !== -1 ? args[baseIdx + 1] : 'https://daku83.github.io/movec-demos').replace(/\/$/, '');

/** altes Repo-Verzeichnis -> Pfad in der neuen Site */
const MAP = {
  'motiondata-landing': 'motiondata',
  'mates-pitch': 'mates',
  'servmate-pitch': 'servmate',
  'techmate-pitch': 'techmate',
  'photomate-pitch': 'photomate',
  'partsmate-pitch': 'partsmate',
  'tyremate-pitch': 'tyremate',
  'workshopAssist-pitch': 'workshopassist',
  'connectapi-pitch': 'connectapi',
  'demo-hub': 'hub',
};

const stub = (target) => `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<title>Umgezogen</title>
<style>
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:32px 16px;
         background:#F4F6F7; color:#24272B;
         font-family:"Segoe UI",Roboto,-apple-system,Arial,sans-serif; }
  main { max-width:420px; text-align:center; background:#fff; border:1px solid #E3E7E9;
         border-radius:14px; padding:36px 28px; }
  h1 { margin:0; font-size:19px; }
  p  { margin:10px 0 0; font-size:14.5px; line-height:1.6; color:#5A5E66; }
  a  { color:#00807E; font-weight:600; }
</style>
</head>
<body>
<main>
  <h1>Diese Seite ist umgezogen</h1>
  <p>Sie werden weitergeleitet. Falls nicht, hier entlang:<br>
     <a href="${target}">${target}</a></p>
</main>
<script>location.replace(${JSON.stringify(target)});</script>
</body>
</html>
`;

let ok = 0, missing = [];
for (const [repo, slug] of Object.entries(MAP)) {
  const dir = resolve(VIBECODE, repo);
  if (!existsSync(dir)) { missing.push(repo); continue; }
  const target = `${BASE}/${slug}/`;
  const file = resolve(dir, 'index.html');
  const already = existsSync(file) && readFileSync(file, 'utf8').includes('Diese Seite ist umgezogen');
  console.log(`${write ? 'schreibe' : 'würde schreiben'}  ${repo}/index.html -> ${target}${already ? '  (ist schon ein Stub)' : ''}`);
  if (write) writeFileSync(file, stub(target), 'utf8');
  ok++;
}

if (missing.length) console.log(`\nnicht gefunden: ${missing.join(', ')}`);
console.log(`\n${ok} Repos${write ? ' geschrieben' : ' (Vorschau — nichts geändert)'}. Basis: ${BASE}`);
if (write) console.log('Die Inhalte bleiben in der Git-Historie der alten Repos erhalten.');
