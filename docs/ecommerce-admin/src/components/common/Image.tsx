'use client';
import { ImageProps } from 'next/image';
import NextImage from 'next/image';

export const Image = ({ src, ...props }: ImageProps) => {
  return (
    <NextImage
      {...props}
      src={src || '/default.png'}
      onError={(e) => (e.currentTarget.srcset = '/default.png')}
    />
  );
};
