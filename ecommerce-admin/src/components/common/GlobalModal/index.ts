import { ButtonProps } from '@/components/ui/button';
import { ReactNode } from 'react';
import { BehaviorSubject } from 'rxjs';

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

export class GlobalModal {
  static subject = new BehaviorSubject<GlobalModalProps | null>(null);

  static async show(
    props: Omit<GlobalModalProps, 'callback' | 'isConfirm'>,
  ): Promise<unknown> {
    return new Promise((resolve) => {
      this.subject.next({
        ...props,
        isConfirm: false,
        callback: (result: unknown) => resolve(result),
      });
    });
  }

  static async confirm(
    props: Omit<GlobalModalProps, 'callback' | 'isConfirm'>,
  ): Promise<boolean | null> {
    return new Promise((resolve) => {
      this.subject.next({
        ...props,
        isConfirm: true,
        callback: (result: boolean | null) => resolve(result),
      });
    });
  }

  static hide(result?: unknown) {
    this.subject.value?.callback(result ?? null);
    this.subject.next(null);
  }
}
