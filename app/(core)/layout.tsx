import { Navbar } from '@/features/core/navbar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

async function Layout({ children }: LayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  return (
    <section>
      <Navbar session={session} />
      <main className='container mx-auto px-4 md:px-6 lg:px-8'>{children}</main>
    </section>
  );
}

export default Layout;