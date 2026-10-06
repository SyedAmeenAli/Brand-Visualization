// Optional, non-invasive event hooks. Nothing is sent anywhere by default.
// Listen with: window.addEventListener('aqarati:event', (e) => console.log(e.detail))
// or define window.aqaratiAnalytics = { track(name, data) {} } before the app loads.

export type AqaratiEvent =
  | 'section_view'
  | 'theme_change'
  | 'language_change'
  | 'logo_variant_select'
  | 'colour_select'
  | 'photo_open'
  | 'plate_select';

declare global {
  interface Window {
    aqaratiAnalytics?: { track: (name: AqaratiEvent, data?: Record<string, unknown>) => void };
  }
}

export function track(name: AqaratiEvent, data: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('aqarati:event', { detail: { name, ...data } }));
    window.aqaratiAnalytics?.track(name, data);
  } catch {
    /* hooks must never break the page */
  }
}
