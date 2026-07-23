#!/usr/bin/env node
// AF-GM-02c: Schlanke Loopback-Testhilfe fuer den Target-Replay-Nachweis von
// tools/golden-master/verify.mjs. Liefert Dateien aus einem festen lokalen
// Wurzelordner ueber HTTP auf 127.0.0.1 aus. Kein neues Paket (node:http),
// kein Dauerprozess -- close() beendet den Server deterministisch.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
};

export async function startLocalServer(rootDir) {
  const rootAbs = resolve(rootDir);

  const server = createServer((req, res) => {
    (async () => {
      try {
        const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const targetPath = resolve(join(rootAbs, urlPath));
        const isInsideRoot = targetPath === rootAbs || targetPath.startsWith(rootAbs + sep);
        if (!isInsideRoot) {
          res.writeHead(403).end('forbidden');
          return;
        }
        const body = await readFile(targetPath);
        const type = CONTENT_TYPES[extname(targetPath)] ?? 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type });
        res.end(body);
      } catch {
        res.writeHead(404).end('not found');
      }
    })();
  });

  await new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });

  const { port } = server.address();
  const url = `http://127.0.0.1:${port}`;
  const close = () => new Promise((resolveClose) => server.close(() => resolveClose()));
  return { url, close };
}
