import { BehaviorSubject } from 'rxjs';

export class GlobalLoading {
  static subject = new BehaviorSubject<boolean>(false);

  static async with<T>(promise: Promise<T>): Promise<T> {
    this.subject.next(true);
    try {
      const result = await promise;
      return result;
    } finally {
      this.subject.next(false);
    }
  }

  static show() {
    this.subject.next(true);
  }

  static hide() {
    this.subject.next(false);
  }
}
