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
