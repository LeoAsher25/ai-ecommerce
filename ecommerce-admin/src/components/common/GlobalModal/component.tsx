'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { GlobalModal } from '.';

type GlobalModalProps = {
  title?: ReactNode;
  content: ReactNode;
  falseLabel?: string;
  falseVariant?: ButtonProps['variant'];
  trueLabel?: string;
  trueVariant?: ButtonProps['variant'];
  isConfirm: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (result: any) => void;
};

export const GlobalModalComponent = () => {
  const [props, setProps] = useState<GlobalModalProps | null>(
    GlobalModal.subject.value,
  );

  const {
    callback,
    isConfirm,
    title,
    content,
    trueLabel,
    trueVariant,
    falseVariant,
    falseLabel,
  } = props ?? {};

  useEffect(() => {
    const subcription = GlobalModal.subject.subscribe(setProps);
    return () => subcription.unsubscribe();
  }, []);

  const handleReturn = useCallback(
    (result: boolean | null) => {
      callback?.(result);
      GlobalModal.subject.next(null);
    },
    [callback],
  );

  if (isConfirm) {
    return (
      <Dialog open={!!props} onOpenChange={() => handleReturn(null)}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="p-6 font-light">{content}</div>
          <DialogFooter>
            <Button
              variant={falseVariant || 'outline'}
              color="secondary"
              onClick={() => handleReturn(false)}
            >
              {falseLabel || 'Huỷ'}
            </Button>
            <Button
              variant={trueVariant || 'default'}
              onClick={() => handleReturn(true)}
            >
              {trueLabel || 'Xác nhận'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={!!props} onOpenChange={() => handleReturn(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
