import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useTranslation from 'next-translate/useTranslation';

export default function Home() {
  const { t, lang } = useTranslation('common');

  return (
    <div className="bg-background text-foreground h-screen flex items-center justify-center">

    </div>
  );
}
