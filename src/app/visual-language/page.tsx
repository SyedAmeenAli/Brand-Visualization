import type { Metadata } from 'next';
import { VisualLanguage } from '@/components/sections/VisualLanguage';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Visual language',
  description: 'Photography, iconography, illustration, spacing, radius, elevation and motion.',
  alternates: { canonical: '/visual-language' },
  openGraph: { title: 'Visual language — AQARATI', description: 'Photography, iconography, illustration, spacing, radius, elevation and motion.', url: '/visual-language' },
};

export default function Page() {
  return (
    <>
      <VisualLanguage />
      <NextChapter current="visual-language" />
    </>
  );
}
