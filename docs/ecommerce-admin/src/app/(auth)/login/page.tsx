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
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { authService } from '@/services';

const formSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  password: z.string().min(2, {
    message: 'Mật khẩu tối thiểu 2 ký tự',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const { toast, toastError } = useToast();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'superadmin@gmail.com',
      password: 'Superadmin@123',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const resp = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    toast({
      title: resp?.ok ? 'Thành công' : 'Có lỗi xảy ra',
      description: resp?.ok ? '' : resp?.error,
      variant: resp?.ok ? 'default' : 'destructive',
      duration: 5000,
    });
    setLoading(false);
    if (resp?.ok) {
      router.push('/');
    }
  };

  const preForgotPassword = useCallback(async () => {
    setLoading(true);
    const { success, message } = await authService.preForgotPassword();
    setLoading(false);
    if (!success) return toastError(message);
    router.push('/change-password');
  }, [router, toastError]);

  return (
    <Card className="w-[480px] rounded-lg shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-border border-b">
            <CardTitle className="text-xl">Đăng nhập</CardTitle>
            <CardDescription>
              Đăng nhập sử dụng email và mật khẩu
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Mật khẩu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="border-border flex flex-col justify-end gap-2 border-t">
            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              disabled={loading}
            >
              Đăng nhập
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-secondary text-sm hover:underline md:text-sm"
              onClick={preForgotPassword}
            >
              Quên mật khẩu ?
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
