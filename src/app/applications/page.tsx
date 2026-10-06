import type { Metadata } from 'next';
import { Applications } from '@/components/sections/Applications';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Applications',
  description: 'The app icon, launch screen and the brand on the web, paper and social.',
  alternates: { canonical: '/applications' },
  openGraph: { title: 'Applications — AQARATI', description: 'The app icon, launch screen and the brand on the web, paper and social.', url: '/applications' },
};

export default function Page() {
  return (
    <>
      <Applications />
      <NextChapter current="applications" />
    </>
  );
}
