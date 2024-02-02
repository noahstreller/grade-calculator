'use client';
import React, { useEffect, useState } from 'react';
import styles from './gac.module.css';
import Subjects from '@/lib/entities/subject';
import Grade from '@/lib/entities/grade';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import useTranslation from 'next-translate/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PassingGradesCard from '@/components/cards/passingGradesCard';
import { BarChart } from 'lucide-react';

export default function GradeAverageCalculator() {
    const { t, lang } = useTranslation('common');
    
    const [data, setData] = useState<Grade[]>([]);

    useEffect(() => {
        Subjects.add("Maths");
        Subjects.add("English");
        Subjects.add("Science");
        Subjects.add("History");
        Subjects.add("Geography");
        Subjects.add("PE");
        Subjects.add("French");
        Subjects.add("German");
        Subjects.add("Spanish");
        Subjects.add("Art");

        new Grade(5.3, "Maths");
        new Grade(5, "Maths");
        new Grade(4.2, "English");
        new Grade(5, "English");
        new Grade(5, "Science");
        new Grade(5, "Science");

        const grades = Grade.get();
        setData(grades);
    }, [data]);

    return (
        <div className={styles.gradeAverageCalculator}>
            <PassingGradesCard />
            <Card>
                <CardHeader>All Grades</CardHeader>
                <CardContent>
                    <DataTable columns={columns()} data={data} /> 
                </CardContent>
            </Card>
        </div>
    );
}