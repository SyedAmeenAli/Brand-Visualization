import type { Metadata } from 'next';
import { Usage } from '@/components/sections/Usage';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Brand usage',
  description: 'Do and don’t guidance and the master rules of the AQARATI identity.',
  alternates: { canonical: '/usage' },
  openGraph: { title: 'Brand usage — AQARATI', description: 'Do and don’t guidance and the master rules of the AQARATI identity.', url: '/usage' },
};

export default function Page() {
  return (
    <>
      <Usage />
      <NextChapter current="usage" />
    </>
  );
}
