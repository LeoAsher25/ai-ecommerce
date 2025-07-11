'use client';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { useEffect, useRef } from 'react';

export function LoadingScreen() {
  const resolveRef = useRef(() => {});
  useEffect(() => {
    GlobalLoading.with(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Promise((resolve) => (resolveRef.current = resolve as any)),
    );

    return resolveRef.current;
  }, []);
  return null;
}
