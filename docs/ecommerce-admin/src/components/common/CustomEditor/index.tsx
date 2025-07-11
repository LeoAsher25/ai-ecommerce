'use client'; // Required only in App Router.

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CustomEditorProps } from './CustomEditor';

const CustomEditor = dynamic(() => import('./CustomEditor'), {
  ssr: false,
});

export const ClientEditor = (props: CustomEditorProps) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  return (
    <div className="min-h-[372.22px] ">
      {isLayoutReady ? (
        <CustomEditor {...props} />
      ) : (
        <div className="min-h-[372.22px] overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="h-[32.8px] w-full bg-gray-100"></div>
          <div className="h-[38.42px] w-full bg-gray-100"></div>
        </div>
      )}
    </div>
  );
};

export default ClientEditor;
