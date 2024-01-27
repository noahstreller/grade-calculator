import useTranslation from "next-translate/useTranslation";
import styles from './header.module.css';

export default function HeaderComponent() {
    const { t, lang } = useTranslation('common');
    return (
        <header className={styles.appHeader}>
            <h1 className="text-3xl font-bold text-gray-300">{t('app.title')}</h1>
        </header>
    );
}