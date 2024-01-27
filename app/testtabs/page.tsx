"use client";
import useTranslation from 'next-translate/useTranslation';

export default function TestTabs(){
    
    const { t, lang } = useTranslation('common')
    const example = t('app.title')
    return (
        <div>
            <h1>{example}</h1>
        </div>
    );
}