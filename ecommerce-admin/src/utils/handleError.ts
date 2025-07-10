import { toast } from '@/hooks/use-toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any, title?: string) {
  let message = '';
  if (Array.isArray(error.message)) {
    message = error.message.join('\n');
  } else {
    message = error.message;
  }
  toast({
    title: title ?? 'Có lỗi xảy ra',
    description: message,
    variant: 'destructive',
    duration: 5000,
  });
}

export default handleError;
