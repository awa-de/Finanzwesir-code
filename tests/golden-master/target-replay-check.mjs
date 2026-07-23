#!/usr/bin/env node
// AF-GM-02c: Deterministischer Treiber fuer einen einzelnen Target-Replay-
// Nachweis. Startet den Loopback-Server aus local-target-server.mjs, ruft
// verify.mjs mit --target-url gegen die servierte Datei auf, schliesst den
// Server danach garantiert (auch bei Fehlern im Kindprozess) und gibt dessen
// Exit-Code unveraendert weiter.

import { spawn } from 'node:child_process'; // CHANGED (AF-GM-02c-Fix): spawnSync blockiert die Event-Loop des Elternprozesses und damit den eigenen HTTP-Server waehrend der Kindprozess laeuft -- der Server konnte dadurch keine Anfragen mehr bedienen (reproduzierter Timeout). Asynchrones spawn haelt die Event-Loop frei.
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startLocalServer } from './local-target-server.mjs';

const [, , serveDir, serveFile, tracePath] = process.argv;
if (!serveDir || !serveFile || !tracePath) {
  console.error('Aufruf: node target-replay-check.mjs <serve-dir> <serve-file> <trace-path>');
  process.exit(1);
}

const toolDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(toolDir, '..', '..');
const verifyPath = resolve(repoRoot, 'tools', 'golden-master', 'verify.mjs');

const { url, close } = await startLocalServer(resolve(repoRoot, serveDir));
let exitCode = 1;
try {
  const targetUrl = `${url}/${serveFile}`;
  exitCode = await new Promise((resolveExit) => { // CHANGED (AF-GM-02c-Fix)
    const child = spawn(process.execPath, [verifyPath, tracePath, '--target-url', targetUrl], { // CHANGED
      cwd: repoRoot, // CHANGED
    }); // CHANGED
    child.stdout.pipe(process.stdout); // CHANGED
    child.stderr.pipe(process.stderr); // CHANGED
    child.on('exit', (code) => resolveExit(code ?? 1)); // CHANGED
  }); // CHANGED
} finally {
  await close();
}
process.exit(exitCode);
