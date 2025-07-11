import { GlobalLoadingComponent } from '@/components/common/GlobalLoading/component';
import { GlobalModalComponent } from '@/components/common/GlobalModal/component';
import { queryClient, QueryClientProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quản lý Topxedap',
};

const NunitoFont = Nunito({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NunitoFont.className} antialiased`}>
        <NextTopLoader />
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
          <GlobalModalComponent />
          <GlobalLoadingComponent />
        </QueryClientProvider>
      </body>
    </html>
  );
}
