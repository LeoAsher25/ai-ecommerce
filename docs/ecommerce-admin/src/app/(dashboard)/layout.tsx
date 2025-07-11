import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '@/components/providers';

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full overflow-hidden">
          <Header />
          <main className="w-full p-4 md:p-6">{children}</main>
        </div>
        {modal}
      </SidebarProvider>
    </SessionProvider>
  );
}
