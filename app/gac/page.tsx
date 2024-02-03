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
        console.log(gradeData);
    }

    function refreshSubjects() {
        let averages = GradeAverage.get();
        setSubjectData([...averages]);
        console.log(subjectData);
    }

    function refreshFailing() {
        let subjects = Subjects.getFailingSubjects();
        setFailingData([...subjects]);
        console.log(failingData);
    }

    function refreshPassing() {
        let subjects = Subjects.getPassingSubjects();
        setPassingData([...subjects]);
        console.log(passingData);
    }

    function refreshAll() {
        refreshGrades();
        refreshSubjects();
        refreshFailing();
        refreshPassing();
    }

    useEffect(() => {
        Subjects.add("Naturwissenschaften und Technik");
        Subjects.add("Mathematik");
        Subjects.add("Englisch");
        Subjects.add("Deutsch");
        Subjects.add("Geschichte");
        Subjects.add("Geographie");
        Subjects.add("Biologie");
        Subjects.add("Physik");
        Subjects.add("Chemie");
        Subjects.add("Informatik");
        Subjects.add("Kunst");
        Subjects.add("Musik");
        Subjects.add("Sport");
        Subjects.add("Religion");
        Subjects.add("Ethik");
        Subjects.add("Politik");
        Subjects.add("Wirtschaft");
        Subjects.add("Gesundheit");
        Subjects.add("Sozialkunde");
        Subjects.add("Philosophie");
        Subjects.add("Psychologie");

        refreshAll();
    }, []);

    return (
        <CardBoard row>
            <CardBoard>
                <PassingGradesCard data={passingData} setData={setPassingData} />
                <FailingGradesCard data={failingData} setData={setFailingData} />
            </CardBoard>
            <AllSubjects data={subjectData} setData={setSubjectData} />
            <AllGrades data={gradeData} setData={setGradeData} refresh={refreshAll} />
        </CardBoard>
    );
}