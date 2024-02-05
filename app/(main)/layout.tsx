'use client';

import MainLayout from '@/components/layouts/main-layout';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
    return (
        <MainLayout>
            {props.children}
        </MainLayout>
    )
}

export default Layout