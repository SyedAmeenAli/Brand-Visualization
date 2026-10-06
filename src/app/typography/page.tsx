import type { Metadata } from 'next';
import { Typography } from '@/components/sections/Typography';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Typography',
  description: 'Fraunces, Plus Jakarta Sans and Arabic type, with the full type scale.',
  alternates: { canonical: '/typography' },
  openGraph: { title: 'Typography — AQARATI', description: 'Fraunces, Plus Jakarta Sans and Arabic type, with the full type scale.', url: '/typography' },
};

export default function Page() {
  return (
    <>
      <Typography />
      <NextChapter current="typography" />
    </>
  );
}
