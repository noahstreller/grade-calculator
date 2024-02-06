"use client";
import { AllGrades } from '@/components/cards/allGrades/allGrades';
import { AllSubjects } from '@/components/cards/allSubjects/allSubjects';
import { AverageOverview } from '@/components/cards/average-overview';
import { CardSkeleton } from '@/components/cards/card-skeleton';
import FailingGradesCard from '@/components/cards/failingGradesCard/failingGradesCard';
import { GradeOverview } from '@/components/cards/grade-overview';
import PassingGradesCard from '@/components/cards/passingGradesCard/passingGradesCard';
import { CardBoard } from '@/components/ui/cardboard';
import Grade from '@/lib/entities/grade';
import { GradeAverage } from '@/lib/entities/gradeAverage';
import Subjects from '@/lib/entities/subject';
import { useEffect, useState } from 'react';

export default function GradeAverageCalculator() {
    const [gradeData, setGradeData] = useState<Grade[]>([]);
    const [subjectData, setSubjectData] = useState<GradeAverage[]>([]);
    const [failingData, setFailingData] = useState<GradeAverage[]>([]);
    const [passingData, setPassingData] = useState<GradeAverage[]>([]);
    const [loaded, setLoaded] = useState(false);

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
        setLoaded(true);
    }, []);

    return (
        loaded 
        ? <>
            <CardBoard className='flex xl:hidden'>
                <AllSubjects data={subjectData} setData={setSubjectData} refresh={refreshAll} />
                <AllGrades data={gradeData} setData={setGradeData} refresh={refreshAll} />
                <PassingGradesCard data={passingData} setData={setPassingData} />
                <FailingGradesCard data={failingData} setData={setFailingData} />
                <AverageOverview data={gradeData} averageData={[...passingData, ...failingData]} />
                <GradeOverview data={gradeData} passingData={passingData} failingData={failingData} />
            </CardBoard>
            <CardBoard row className='hidden xl:flex'>
                <CardBoard>
                    <PassingGradesCard data={passingData} setData={setPassingData} />
                    <FailingGradesCard data={failingData} setData={setFailingData} />
                    <AverageOverview data={gradeData} averageData={[...passingData, ...failingData]} />
                </CardBoard>
                <CardBoard>
                    <AllSubjects data={subjectData} setData={setSubjectData} refresh={refreshAll} />
                    <GradeOverview data={gradeData} passingData={passingData} failingData={failingData} />
                </CardBoard>
                <AllGrades data={gradeData} setData={setGradeData} refresh={refreshAll} />
            </CardBoard>
        </>
        : <>
            <CardBoard className='flex xl:hidden'>
                <CardSkeleton wide variant='medium' />
                <CardSkeleton wide variant='large' />
                <CardSkeleton wide variant='small' />
                <CardSkeleton wide variant='small' />
            </CardBoard>    
            <CardBoard row className='hidden xl:flex'>
                <CardBoard>
                    <CardSkeleton variant='small' />
                    <CardSkeleton variant='small' />
                    <CardSkeleton variant='medium' />
                </CardBoard>
                <CardBoard>
                    <CardSkeleton variant='medium' />
                    <CardSkeleton variant='medium' />
                </CardBoard>
                <CardSkeleton variant='large' />
            </CardBoard> 
        </>
    );
}