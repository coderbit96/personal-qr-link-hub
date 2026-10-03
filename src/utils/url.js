export function getSafeHttpsUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;

  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'https:' ? parsed.href : null;
  } catch {
    return null;
  }
}

export function getProductionLandingUrl(configuredUrl = '') {
  const savedUrl = typeof window !== 'undefined' ? localStorage.getItem('qrhub:site-url') : '';
  const configured = getSafeHttpsUrl(savedUrl || configuredUrl);
  if (configured) return new URL('/', configured).href;

  if (typeof window !== 'undefined') {
    const origin = getSafeHttpsUrl(window.location.origin);
    if (origin && !['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname)) {
      return new URL('/', origin).href;
    }
  }

  return '';
}
