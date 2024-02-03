"use client";
import { AllGrades } from '@/components/cards/allGrades/allGrades';
import { AllSubjects } from '@/components/cards/allSubjects/allSubjects';
import FailingGradesCard from '@/components/cards/failingGradesCard/failingGradesCard';
import PassingGradesCard from '@/components/cards/passingGradesCard/passingGradesCard';
import { CardBoard } from '@/components/ui/cardboard/cardboard';
import Grade from '@/lib/entities/grade';
import { GradeAverage } from '@/lib/entities/gradeAverage';
import Subjects from '@/lib/entities/subject';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

export default function GradeAverageCalculator() {
    const { t, lang } = useTranslation('common');

    const [gradeData, setGradeData] = useState<Grade[]>([]);
    const [subjectData, setSubjectData] = useState<GradeAverage[]>([]);
    const [failingData, setFailingData] = useState<GradeAverage[]>([]);
    const [passingData, setPassingData] = useState<GradeAverage[]>([]);

    function refreshGrades() {
        let grades = Grade.get();
        setGradeData([...grades]);
    }

    function refreshSubjects() {
        let averages = GradeAverage.get();
        setSubjectData([...averages]);
    }

    function refreshFailing() {
        let subjects = Subjects.getFailingSubjects();
        setFailingData([...subjects]);
    }

    function refreshPassing() {
        let subjects = Subjects.getPassingSubjects();
        setPassingData([...subjects]);
    }

    function refreshAll() {
        refreshGrades();
        refreshSubjects();
        refreshFailing();
        refreshPassing();
    }

    useEffect(() => {
        Subjects.load();
        Grade.load();
        refreshAll();
    }, []);

    return (
        <CardBoard row>
            <CardBoard>
                <PassingGradesCard data={passingData} setData={setPassingData} />
                <FailingGradesCard data={failingData} setData={setFailingData} />
            </CardBoard>
            <AllSubjects data={subjectData} setData={setSubjectData} refresh={refreshAll} />
            <AllGrades data={gradeData} setData={setGradeData} refresh={refreshAll} />
        </CardBoard>
    );
}