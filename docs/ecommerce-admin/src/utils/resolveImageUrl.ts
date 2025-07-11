import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function resolveImageUrl(
  src: string | StaticImport,
): string | StaticImport {
  if (typeof src !== 'string') return src; // StaticImport (imported image) → dùng nguyên

  const isFullUrl = /^https?:\/\//i.test(src);
  if (isFullUrl) return src;

  return `/api/proxy/files/${src}`;
}
