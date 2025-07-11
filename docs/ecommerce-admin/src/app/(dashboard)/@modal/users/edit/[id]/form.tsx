'use client';

import { revalidate } from '@/actions';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigation } from '@/hooks/use-navigation';
import { userService } from '@/services';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { APP_ROUTES } from '@/constants/routes';

const formSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(2, {
      message: 'Tên người dùng tối thiểu 2 ký tự',
    }),
    email: z.string().email({
      message: 'Sai định dạng email',
    }),
    phoneNumber: z
      .string()
      .optional()
      .refine((value) => (!value ? true : /^[0-9]{9,12}$/.test(value)), {
        message: 'Số điện thoại không hợp lệ',
      }),
    password: z.string().min(8, {
      message: 'Mật khẩu tối thiểu 8 ký tự',
    }),
  })
  .refine(({ id, password }) => id || password, {
    message: 'Mật khẩu không được bỏ trống',
    path: ['password'],
  });

type FormValues = z.infer<typeof formSchema>;

export function UpsertUserForm({ data }: { data: User | null }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { goBack } = useNavigation(APP_ROUTES.USERS);
  const [show, setShow] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const { success, message } = await userService.upsertUser({
      ...values,
      password: values.password ? values.password : '',
    });
    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });
    if (success) {
      await revalidate({ path: '/users', type: 'page' });
      goBack();
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form className="max-w-[inherit]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Tên người dùng</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập tên người dùng" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập email của người dùng" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nhập số điện thoại của người dùng"
                  />
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
                    type={show ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu của người dùng"
                    suffixIcon={
                      show ? (
                        <EyeOff
                          className="cursor-pointer"
                          onClick={() => setShow(false)}
                        />
                      ) : (
                        <Eye
                          className="cursor-pointer"
                          onClick={() => setShow(true)}
                        />
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            color="secondary"
            disabled={loading}
            onClick={goBack}
          >
            Huỷ
          </Button>
          <Button type="submit" isLoading={loading} disabled={loading}>
            Lưu
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
