import { AllGrades } from '@/components/cards/allGrades/allGrades';
import { AllSubjects } from '@/components/cards/allSubjects/allSubjects';
import FailingGradesCard from '@/components/cards/failingGradesCard/failingGradesCard';
import PassingGradesCard from '@/components/cards/passingGradesCard/passingGradesCard';
import { CardBoard } from '@/components/ui/cardboard/cardboard';
import useTranslation from 'next-translate/useTranslation';

export default function GradeAverageCalculator() {
    const { t, lang } = useTranslation('common');

    return (
        <CardBoard row>
            <CardBoard>
                <PassingGradesCard />
                <FailingGradesCard />
            </CardBoard>
            <AllSubjects />
            <AllGrades />
        </CardBoard>
    );
}