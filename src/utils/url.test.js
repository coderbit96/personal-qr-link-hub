import assert from 'node:assert/strict';
import test from 'node:test';
import { getProductionLandingUrl, getSafeHttpsUrl } from './url.js';

function inBrowser(origin, savedUrl, callback) {
  globalThis.window = { location: { origin } };
  globalThis.localStorage = { getItem: () => savedUrl };

  try {
    callback();
  } finally {
    delete globalThis.window;
    delete globalThis.localStorage;
  }
}

test('deployed QR points to the link card, not back to the QR page', () => {
  inBrowser('https://my-hub.vercel.app', 'https://old-hub.vercel.app/', () => {
    assert.equal(getProductionLandingUrl(), 'https://my-hub.vercel.app/links');
  });
});

test('a configured canonical domain keeps printed QR codes stable', () => {
  inBrowser('https://preview-hub.vercel.app', '', () => {
    assert.equal(getProductionLandingUrl('https://my-domain.example/'), 'https://my-domain.example/links');
  });
});

test('a saved URL on localhost is normalized to the link card', () => {
  inBrowser('http://localhost:5173', 'https://my-hub.vercel.app/', () => {
    assert.equal(getProductionLandingUrl(), 'https://my-hub.vercel.app/links');
  });
});

test('localhost is never encoded into the QR', () => {
  inBrowser('http://localhost:5173', '', () => {
    assert.equal(getProductionLandingUrl('https://localhost:5173'), '');
  });
});

test('external links accept only HTTPS', () => {
  assert.equal(getSafeHttpsUrl('https://wa.me/919641212416'), 'https://wa.me/919641212416');
  assert.equal(getSafeHttpsUrl('javascript:alert(1)'), null);
  assert.equal(getSafeHttpsUrl('http://example.com'), null);
});
