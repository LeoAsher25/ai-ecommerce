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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SearchableSelect } from '@/components/ui/searchable-select';
import { APP_ROUTES } from '@/constants/routes';
import {
  productCategoryService,
  useGetProductCategories,
} from '@/services/productCategories';
import { IProductCategory } from '@/types/productCategory';
import { normalizeString } from '@/utils/string';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Không được phép để trống',
  }),
  parentId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EditProductCategoryForm({
  category,
}: {
  category?: IProductCategory;
}) {
  const { data: categoriesData } = useGetProductCategories({
    pageSize: 9999,
  });

  const categoriesList: IProductCategory[] = categoriesData?.success
    ? categoriesData?.data?.data
    : ([] as IProductCategory[]);

  const [filteredCategories, setFilteredCategories] =
    useState<IProductCategory[]>(categoriesList);

  const [loading, setLoading] = useState(false);
  const { goBack } = useNavigation(APP_ROUTES.PRODUCT_CATEGORIES);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name ?? '',
      parentId: category?.parentId ?? undefined,
    },
  });

  useEffect(() => {
    setFilteredCategories(categoriesList);
  }, [categoriesData]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    const { success, message } =
      await productCategoryService.upsertProductCategory({
        id: category?._id,
        name: values.name,
        parentId: values.parentId,
      });
    await revalidate({ path: APP_ROUTES.PRODUCT_CATEGORIES, type: 'page' });
    setLoading(false);
    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });
    if (success) {
      goBack();
    }
  };

  const handleGetCategories = (search: string) => {
    const normalizedSearch = normalizeString(search);

    setFilteredCategories(
      categoriesList.filter((item) => {
        const normalizedName = normalizeString(item.name || '');
        return normalizedName.includes(normalizedSearch);
      }),
    );
  };

  return (
    <Form {...form}>
      <form className="max-w-[inherit]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-6">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Tên phân loại</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tên phân loại" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Phân loại cha</FormLabel>
                <SearchableSelect
                  options={filteredCategories.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Chọn phân loại cha"
                  onSearch={handleGetCategories}
                  minSearchLength={3}
                />
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
