"use client";
import { AllGrades } from '@/components/cards/allGrades/allGrades';
import { AllSubjects } from '@/components/cards/allSubjects/allSubjects';
import FailingGradesCard from '@/components/cards/failingGradesCard/failingGradesCard';
import PassingGradesCard from '@/components/cards/passingGradesCard/passingGradesCard';
import { CardBoard } from '@/components/ui/cardboard/cardboard';
import Grade from '@/lib/entities/grade';
import { GradeAverage } from '@/lib/entities/gradeAverage';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

export default function GradeAverageCalculator() {
    const { t, lang } = useTranslation('common');

    const [gradeData, setGradeData] = useState<Grade[]>([]);
    const [GradeAverageData, setGradeAverageData] = useState<GradeAverage[]>([]);

    return (
        <CardBoard row>
            <CardBoard>
                <PassingGradesCard />
                <FailingGradesCard />
            </CardBoard>
            <AllSubjects />
            <AllGrades data={gradeData} setData={setGradeData} />
        </CardBoard>
    );
}