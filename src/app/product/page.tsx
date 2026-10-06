import type { Metadata } from 'next';
import { Product } from '@/components/sections/Product';
import { NextChapter } from '@/components/sections/ChapterLinks';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Light and dark product screens, navigation, a property expressed and verification.',
  alternates: { canonical: '/product' },
  openGraph: { title: 'Product — AQARATI', description: 'Light and dark product screens, navigation, a property expressed and verification.', url: '/product' },
};

export default function Page() {
  return (
    <>
      <Product />
      <NextChapter current="product" />
    </>
  );
}
