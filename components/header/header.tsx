"use client";
/* eslint-disable @next/next/no-img-element */
import { isMobileDevice } from "@/lib/utils";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher";
import { ClearDataButton } from "../ui/clear-data-button";
import styles from './header.module.css';

export default function HeaderComponent() {
    const { t, lang } = useTranslation('common');
    return (
        <header className={styles.appHeader}>
            <Link href={"/"} className="flex items-center text-center opacity-80 gap-1 hover:opacity-100 hover:translate-x-[10px] transition-all">
                <img src="/icon.png" alt="Logo" className="h-[100%] dark:invert opacity-80 drag-none select-none" />
                {
                !isMobileDevice()
                ? <h1 className={"text-3xl font-bold text-foreground whitespace-nowrap select-none"}>{t('app.title')}</h1>
                : null
                }
            </Link>
            <div className="flex">
                <ClearDataButton />
                <ThemeSwitcher />
            </div>
        </header>
    );
}