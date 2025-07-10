import { ActionState } from '@/types';
import { ZodError } from 'zod';

export const isClient = () => typeof window !== 'undefined';

export const handleServerAction =
  <T>(fn: (...args: T[]) => Promise<ActionState>) =>
  async (...args: T[]) => {
    try {
      const resp = await fn(...args);
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          success: false,
          message: 'Invalid form data',
          errors: e.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: `server validation: ${issue.message}`,
          })),
        };
      }

      return {
        success: false,
        message: 'Something went wrong, please try again.',
      };
    }
  };

export const generateCosmeticCode = (id?: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  const targetLength = 9;
  let result = id?.toString().padEnd(2, '0') || '';
  for (let i = 0; result.length < targetLength; i++) {
    const randomInd = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomInd);
  }

  return result.toUpperCase();
};
