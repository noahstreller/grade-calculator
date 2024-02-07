import { ReactNode } from 'react';

export function CardBoard({ children, row, column = true, className = "" }: { children: ReactNode, row?: boolean, className?: string, column?: boolean}) {
    const cardboardClasses = "flex items-start justify-center gap-5 [&>*]:w-[100%] [&>*]:max-w-[90vw] max-w-[95vw]";

    if (row) {
        return (
            <div className={`flex-row ${cardboardClasses} ${className}`}>
                {children}
            </div>
        )
    }
    if (column) {
        return (
            <div className={`flex-col ${cardboardClasses} ${className}`}>
                {children}
            </div>
        )
    }
    return (
        <div className={`${cardboardClasses} ${className}`}>
            {children}
        </div>
    )
}