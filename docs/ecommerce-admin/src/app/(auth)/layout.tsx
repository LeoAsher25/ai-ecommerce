import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-screen items-start justify-center pt-28">
      {children}
    </main>
  );
}
