'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import { authService } from '@/services';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const formSchema = z
  .object({
    password: z.string().min(2, {
      message: 'Mật khẩu tối thiểu 2 ký tự',
    }),
    password_confirm: z.string().min(2, {
      message: 'Mật khẩu tối thiểu 2 ký tự',
    }),
    otp: z.string().min(6, {
      message: 'Mã xác thực OTP tối thiểu 6 ký tự',
    }),
  })
  .refine(({ password, password_confirm }) => password === password_confirm, {
    message: 'Mật khẩu không khớp',
    path: ['password_confirm'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [counter, setCounter] = useState(0);

  const timer = useRef<unknown>(null);

  const { toastError, toastSuccess } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password_confirm: '',
      otp: '',
    },
  });

  const onSubmit = useCallback(
    async (values: FormValues) => {
      setLoading(true);
      const { success, message } = await authService.forgotPassword({
        newPassword: values.password,
        code: values.otp,
      });
      setLoading(false);

      if (!success) return toastError(message);

      setComplete(true);
    },
    [toastError],
  );

  const resendOTP = useCallback(async () => {
    if (counter > 0 || loading) return;
    setLoading(true);
    const { success, message } = await authService.preForgotPassword();
    if (!success) toastError(message);
    toastSuccess(message);
    setLoading(false);

    setCounter(60);
    timer.current = setInterval(() => {
      setCounter((count) => count - 1);
    }, 1000);
  }, [counter, loading, toastError, toastSuccess]);

  useEffect(() => {
    if (counter <= 0) {
      setCounter(0);
      clearInterval(timer.current as NodeJS.Timeout);
    }
  }, [counter]);

  if (complete) {
    return (
      <Card className="w-[480px] rounded-lg shadow-none">
        <CardContent className="p-10">
          <div className="flex w-full flex-col items-center gap-4">
            <CircleCheck className="stroke-primary" size={80} />
            <p className="text-secondary">Mật khẩu thay đổi thành công</p>
            <Button className="mt-8 w-full" asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[480px] rounded-lg shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-border border-b">
            <CardTitle className="text-xl">Thay đổi mật khẩu</CardTitle>
            <CardDescription>
              Một mã xác thực đã được gửi tới email{' '}
              <span className="font-semibold">
                {process.env.NEXT_PUBLIC_ADMIN_EMAIL}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Mật khẩu mới"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã xác thực</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="OTP" />
                    </FormControl>
                    <FormMessage />
                    <span
                      className={cn(
                        'text-secondary cursor-not-allowed text-sm',
                        {
                          'cursor-pointer hover:underline':
                            !loading && counter === 0,
                        },
                      )}
                      onClick={counter === 0 ? resendOTP : undefined}
                    >
                      {counter > 0
                        ? `Gửi lại trong ${counter}s`
                        : 'Gửi lại mã xác thực'}
                    </span>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="border-border flex justify-end gap-6 border-t">
            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              disabled={loading}
            >
              Xác nhận
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
