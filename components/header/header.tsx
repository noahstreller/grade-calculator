import useTranslation from "next-translate/useTranslation";
import styles from './header.module.css';
import { ThemeSwitcher } from "../theme-switcher";

export default function HeaderComponent() {
    const { t, lang } = useTranslation('common');
    return (
        <header className={styles.appHeader}>
            <h1 className="text-3xl font-bold text-foreground">{t('app.title')}</h1>
            <ThemeSwitcher />
        </header>
    );
}