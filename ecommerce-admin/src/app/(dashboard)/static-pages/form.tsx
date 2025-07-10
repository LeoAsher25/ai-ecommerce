'use client';

import { GlobalLoading } from '@/components/common/GlobalLoading';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { staticPageService } from '@/services/staticPage';
import { StaticPage } from '@/services/staticPage/type';
import { toSlug } from '@/utils/string';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { revalidate } from '@/actions/revalidate';
import { useToast } from '@/hooks/use-toast';
import { CustomEditor } from '@/components/common/CustomEditor';

const formSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  slug: z.string().min(1, 'Vui lòng nhập slug'),
  content: z.string().min(1, 'Vui lòng nhập nội dung'),
  metaDescription: z.string().optional(),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface StaticPageFormProps {
  initialData?: StaticPage;
}

export function StaticPageForm({ initialData }: StaticPageFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isAutoSlug, setIsAutoSlug] = useState(!initialData);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || '',
      metaDescription: initialData?.metaDescription || '',
      isActive: initialData?.isActive ?? true,
    },
  });

  const { watch, setValue } = form;
  const title = watch('title');

  useEffect(() => {
    if (isAutoSlug && title) {
      setValue('slug', toSlug(title));
    }
  }, [title, isAutoSlug, setValue]);

  const onSubmit = async (values: FormValues) => {
    GlobalLoading.show();

    const { success, message } = initialData
      ? await staticPageService.updateStaticPage(initialData.slug, values)
      : await staticPageService.createStaticPage(values);

    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });

    if (success) {
      await revalidate({ path: APP_ROUTES.STATIC_PAGES, type: 'page' });
      router.push(APP_ROUTES.STATIC_PAGES);
    }

    GlobalLoading.hide();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Slug</FormLabel>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Tự động tạo slug</span>
                  <Switch
                    checked={isAutoSlug}
                    onCheckedChange={setIsAutoSlug}
                  />
                </div>
              </div>
              <FormControl>
                <Input {...field} readOnly={isAutoSlug} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả meta (SEO)</FormLabel>
              <FormControl>
                <textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung</FormLabel>
              <FormControl>
                <CustomEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Kích hoạt</FormLabel>
                <div className="text-muted-foreground text-sm">
                  Trang sẽ được hiển thị công khai
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(APP_ROUTES.STATIC_PAGES)}
          >
            Hủy
          </Button>
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Form>
  );
}
