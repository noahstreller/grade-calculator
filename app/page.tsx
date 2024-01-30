import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useTranslation from 'next-translate/useTranslation';
import GradeAverageCalculator from './gac/page';

export default function Home() {
  const { t, lang } = useTranslation('common');

  return (
    <div>
      <GradeAverageCalculator />
    </div>
  );
}
