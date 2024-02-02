import { ReactNode } from 'react';
import styles from './cardboard.module.css';

export function CardBoard({ children, row }: { children: ReactNode, row?: boolean}) {
    if (row) {
        return (
            <div className={styles.cardBoard + " " + styles.row}>
                {children}
            </div>
        )
    }
    return (
        <div className={styles.cardBoard}>
            {children}
        </div>
    )
}