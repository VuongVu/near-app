import type { ReactNode } from 'react';

import Navbar from 'components/layout/Navbar';

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export default Layout;
