'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function Chrome({
    header,
    footer,
    children,
}: {
    header: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}) {
    const pathname = usePathname();

    if (pathname === '/') {
        return <>{children}</>;
    }

    return (
        <>
            <div className="relative z-60">{header}</div>
            {children}
            <div className="relative z-50">{footer}</div>
        </>
    );
}
