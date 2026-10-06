'use client';

import { UI_TOKENS } from '@/content/data';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';

/** One property card, composed only from semantic tokens, shown in forced light and forced dark. */
function Card({ mode }: { mode: 'light' | 'dark' }) {
  const { t } = useLang();
  const c = COPY.product;
  const v = mode === 'light' ? 'light' : 'dark';
  return (
    <div data-force={mode === 'light' ? 'light' : undefined} data-band={mode === 'dark' ? 'dark' : undefined} className="rounded-xl border border-line bg-bg p-5 text-ink md:p-7">
      <p className="t-eyebrow text-ink-3">{mode === 'light' ? t(COPY.ui.light) : t(COPY.ui.dark)}</p>
      <div className="mt-5 rounded-xl border border-line-soft bg-surface p-5 shadow-[var(--elev-1)]">
        <span className="inline-flex items-center gap-2 rounded-md border border-line-soft bg-bg-2 px-2.5 py-1 text-[12px] font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />{t(c.propertyTag)}
        </span>
        <p className="t-h2 mt-4">{t(c.propertyName)}</p>
        <p className="t-body-sm mt-1 text-ink-2">{t(c.propertyLoc)}</p>
        <p className="font-display mt-4 text-[28px] font-semibold">{t(c.propertyPrice)}</p>
        <p className="t-caption mt-1 text-ink-3">{t(c.propertyFacts)}</p>
        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex min-h-11 items-center rounded-lg bg-brand px-5 text-[14px] font-semibold text-white">{t(c.propertyCta)}</span>
          <span className="text-[12px] text-warning">{t({ en: 'Pending', ar: 'قيد المراجعة' })}</span>
          <span className="text-[12px] text-error">{t({ en: 'Error', ar: 'خطأ' })}</span>
          <span className="text-[12px] text-disabled">{t({ en: 'Disabled', ar: 'معطّل' })}</span>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-5">
        {UI_TOKENS.map((u) => (
          <li key={u.token} className="min-w-0">
            <span className="block h-8 rounded-md border border-line-soft" style={{ backgroundColor: v === 'light' ? u.light : u.dark }} aria-hidden="true" />
            <span className="mt-1 block truncate text-[10px] leading-[13px] text-ink-3" dir="ltr">{u.token}</span>
            <span className="block text-[10px] leading-[13px] tabular-nums text-ink-2" dir="ltr">{v === 'light' ? u.light : u.dark}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ThemePreview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card mode="light" />
      <Card mode="dark" />
    </div>
  );
}
