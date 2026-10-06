import { ChapterIndex } from '@/components/sections/ChapterLinks';
import { Essence } from '@/components/sections/Essence';
import { Final } from '@/components/sections/Final';
import { Hero } from '@/components/sections/Hero';
import { LogoReveal } from '@/components/sections/LogoReveal';

export default function Page() {
  return (
    <>
      <Hero />
      <LogoReveal />
      <Essence />
      <ChapterIndex />
      <Final />
    </>
  );
}
