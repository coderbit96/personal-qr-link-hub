import test from 'node:test';
import assert from 'node:assert/strict';
import { isStandalonePwa, pwaManifest } from './pwa.js';

test('the installed PWA always launches the QR screen', () => {
  assert.equal(pwaManifest.name, 'Scan & Connect');
  assert.equal(pwaManifest.short_name, 'Scan & Connect');
  assert.equal(pwaManifest.id, '/');
  assert.equal(pwaManifest.start_url, '/');
  assert.equal(pwaManifest.scope, '/');
  assert.equal(pwaManifest.display, 'standalone');
  assert.notEqual(pwaManifest.start_url, '/links');
});

test('server and build environments are not treated as an installed PWA', () => {
  assert.equal(isStandalonePwa(), false);
});
