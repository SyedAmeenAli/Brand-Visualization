import type { Metadata } from 'next';
import { Colour } from '@/components/sections/Colour';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Colour',
  description: 'Mocha, Ivory and Deep Mocha, plus the light and dark UI tokens.',
  alternates: { canonical: '/colour' },
  openGraph: { title: 'Colour — AQARATI', description: 'Mocha, Ivory and Deep Mocha, plus the light and dark UI tokens.', url: '/colour' },
};

export default function Page() {
  return (
    <>
      <Colour />
      <NextChapter current="colour" />
    </>
  );
}
