import { Navbar } from '@/features/core/navbar';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

async function Layout({ children }: LayoutProps) {

  return (
    <section>
      <Navbar />
      <main className='container mx-auto px-4 md:px-6 lg:px-8'>{children}</main>
    </section>
  );
}

export default Layout;