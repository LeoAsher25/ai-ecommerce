'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidate = async ({
  path,
  tag,
  type,
}: {
  path?: string;
  tag?: string;
  type?: 'layout' | 'page';
}) => {
  if (path) return revalidatePath(path, type);
  return revalidateTag(tag || '');
};
