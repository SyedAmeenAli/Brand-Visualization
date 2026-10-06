import type { Metadata } from 'next';
import { Identity } from '@/components/sections/Identity';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Identity',
  description: 'The AQARATI master mark: construction, clear space, minimum size and variants.',
  alternates: { canonical: '/identity' },
  openGraph: { title: 'Identity — AQARATI', description: 'The AQARATI master mark: construction, clear space, minimum size and variants.', url: '/identity' },
};

export default function Page() {
  return (
    <>
      <Identity />
      <NextChapter current="identity" />
    </>
  );
}
