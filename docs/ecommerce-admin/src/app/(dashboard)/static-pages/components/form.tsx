'use client';

import { GlobalLoading } from '@/components/common/GlobalLoading';
import CustomEditor from '@/components/common/CustomEditor';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

const formSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  slug: z.string().min(1, 'Vui lòng nhập slug'),
  content: z.string().min(1, 'Vui lòng nhập nội dung'),
  metaDescription: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z
    .object({
      category: z.string().optional(),
      order: z.number().optional(),
      showInFooter: z.boolean().optional(),
      showInHeader: z.boolean().optional(),
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StaticPageFormProps {
  initialData?: StaticPage;
}

// Categories for static pages
const STATIC_PAGE_CATEGORIES = [
  { value: 'about', label: 'Về chúng tôi' },
  { value: 'customer-service', label: 'Dịch vụ khách hàng' },
  { value: 'policy', label: 'Chính sách' },
  { value: 'terms', label: 'Điều khoản' },
  { value: 'other', label: 'Khác' },
];

export default function StaticPageForm({ initialData }: StaticPageFormProps) {
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
      metadata: {
        category: initialData?.metadata?.category || '',
        order: initialData?.metadata?.order || 0,
        showInFooter: initialData?.metadata?.showInFooter || false,
        showInHeader: initialData?.metadata?.showInHeader || false,
      },
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
        </div>

        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả meta (SEO)</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={3}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-md border p-4">
          <h3 className="mb-4 text-lg font-medium">Cài đặt hiển thị</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="metadata.category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATIC_PAGE_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metadata.order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thứ tự hiển thị</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="metadata.showInFooter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Hiển thị ở footer
                    </FormLabel>
                    <div className="text-muted-foreground text-sm">
                      Trang sẽ được hiển thị ở phần footer của website
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

            <FormField
              control={form.control}
              name="metadata.showInHeader"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Hiển thị ở header
                    </FormLabel>
                    <div className="text-muted-foreground text-sm">
                      Trang sẽ được hiển thị ở phần header của website
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
          </div>
        </div>

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
