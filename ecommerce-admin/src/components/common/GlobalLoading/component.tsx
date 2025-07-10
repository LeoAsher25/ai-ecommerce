'use client';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GlobalLoading } from '.';

export const GlobalLoadingComponent = () => {
  const [isLoading, setLoading] = useState<boolean>(
    GlobalLoading.subject.value,
  );

  useEffect(() => {
    const subcription = GlobalLoading.subject.subscribe(setLoading);
    return () => subcription.unsubscribe();
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20">
      <LoaderCircle className="size-10 animate-spin stroke-white/80" />
    </div>
  );
};
