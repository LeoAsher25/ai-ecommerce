'use client';
import { SVGProps } from 'react';

type CProps = SVGProps<SVGSVGElement>;

export function IcArrowDown(props: CProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 8L12 16L4 8"
        stroke="#B2B2B2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
