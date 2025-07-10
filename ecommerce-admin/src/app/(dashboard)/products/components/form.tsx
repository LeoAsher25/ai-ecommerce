'use client';

import { revalidate } from '@/actions';
import CustomEditor from '@/components/common/CustomEditor';
import { Image } from '@/components/common/Image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageContentHeader from '@/components/ui/PageContentHeader';
import { SearchableSelect } from '@/components/ui/searchable-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APP_ROUTES } from '@/constants/routes';
import { useNavigation } from '@/hooks/use-navigation';
import { useToast } from '@/hooks/use-toast';
import { productService } from '@/services/product';
import { useGetProductCategories } from '@/services/productCategories';
import { uploadService } from '@/services/upload';
import { IProduct, ProductStatus } from '@/types/product';
import { IProductCategory } from '@/types/productCategory';
import handleError from '@/utils/handleError';
import resolveImageUrl from '@/utils/resolveImageUrl';
import { normalizeString } from '@/utils/string';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Trường bắt buộc' }),
  description: z.string().min(1, { message: 'Trường bắt buộc' }),
  categoryIds: z.array(z.string()).min(1, {
    message: 'Trường bắt buộc',
  }),
  sellingPrice: z.number().min(1, { message: 'Trường bắt buộc' }),
  originalPrice: z.number().optional(),
  images: z.array(z.string()).min(1, { message: 'Phải có ít nhất 1 ảnh' }),
  status: z.nativeEnum(ProductStatus),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = ({ initialData }: { initialData: IProduct | null }) => {
  const router = useRouter();
  const { goBack } = useNavigation(APP_ROUTES.PRODUCTS);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const imagesInputRef = useRef<HTMLInputElement>(null);

  const { data: categoriesData } = useGetProductCategories({
    pageSize: 9999,
  });

  const categoriesList = useMemo(() => {
    return categoriesData?.success
      ? categoriesData?.data?.data
      : ([] as IProductCategory[]);
  }, [categoriesData]);

  const [filteredCategories, setFilteredCategories] =
    useState<IProductCategory[]>(categoriesList);
  const form = useForm<FormValues>({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      categoryIds: initialData?.categories?.map((item) => item?._id) || [],
      sellingPrice: initialData?.sellingPrice || 0,
      originalPrice: initialData?.originalPrice || 0,
      images: initialData?.images || [],
      status: initialData?.status ?? ProductStatus.DRAFT,
    },
    resolver: zodResolver(formSchema),
  });

  const watchedImages = form.watch('images');

  const onSubmit = async (values: FormValues) => {
    // Validate file types and sizes
    for (const file of files) {
      if (!file.type.startsWith('image')) {
        return form.setError('root.image', {
          message: `File "${file.name}" không phải là hình ảnh`,
        });
      }
      if (file.size > 5000000) {
        return form.setError('root.image', {
          message: `Ảnh "${file.name}" vượt quá kích cỡ 5MB`,
        });
      }
    }

    setLoading(true);

    try {
      // Prepare image URLs array
      let imageUrls: string[] = [];

      // Keep existing images from initialData that are still in previews
      // but not in the files array (they're already uploaded)
      if (initialData?.images?.length) {
        const existingImages = watchedImages.filter(
          (preview) =>
            initialData.images.includes(preview) &&
            !preview.startsWith('blob:'),
        );
        imageUrls = [...existingImages];
      }

      // Upload new images
      if (files.length > 0) {
        // Upload each file and collect URLs
        const uploadPromises = files.map(async (file) => {
          const {
            success: uploadSuccess,
            data: uploadData,
            message: uploadMessage,
          } = await uploadService.upload(file);

          if (!uploadSuccess) {
            throw new Error(`Lỗi tải ảnh ${file.name}: ${uploadMessage}`);
          }

          return uploadData.path;
        });

        try {
          // Wait for all uploads to complete
          const uploadedUrls = await Promise.all(uploadPromises);
          imageUrls = [...imageUrls, ...uploadedUrls];
        } catch (uploadError) {
          setLoading(false);
          handleError(uploadError, 'Lỗi tải ảnh');

          return;
        }
      }

      // Prepare data for API
      const productData = {
        ...values,
        images: imageUrls,
        id: initialData?._id,
      };

      // Call API to create/update product
      const { success, message } =
        await productService.upsertProduct(productData);

      // Revalidate page
      await revalidate({ path: APP_ROUTES.PRODUCTS, type: 'page' });

      // Show toast message
      toast({
        title: success ? 'Thành công' : 'Có lỗi xảy ra',
        description: message,
        variant: success ? 'success' : 'destructive',
        duration: 5000,
      });

      // Redirect if successful
      if (success) {
        router.refresh();
        goBack();
      }
    } catch (error) {
      console.error('Error submitting product form:', error);

      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi chọn file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);

      // Thêm các file mới vào danh sách
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      // Tạo URL cho preview
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );

      // Lấy giá trị hiện tại của trường images
      const currentImages = form.getValues('images') || [];

      // Cập nhật giá trị của trường images trong form
      const updatedImages = [...currentImages, ...newPreviews];
      form.setValue('images', updatedImages);

      // Xóa lỗi nếu có
      form.setError('root.image', {
        message: '',
      });

      if (imagesInputRef.current) {
        imagesInputRef.current.value = '';
      }
    }
  };

  // Xử lý khi xóa ảnh
  const handleRemoveImage = (index: number) => {
    // Xóa file tại vị trí index
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Lấy giá trị hiện tại của trường images
    const currentImages = form.getValues('images') || [];

    // Xóa preview và revoke URL
    const previewToRemove = currentImages[index];
    if (previewToRemove && previewToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(previewToRemove);
    }

    // Cập nhật giá trị của trường images trong form
    const updatedImages = currentImages.filter((_, i: number) => i !== index);
    form.setValue('images', updatedImages);
  };

  // Xử lý khi xóa tất cả ảnh
  const handleRemoveAllImages = () => {
    // Lấy giá trị hiện tại của trường images
    const currentImages = form.getValues('images') || [];

    // Revoke tất cả URL
    currentImages.forEach((image: string) => {
      if (image && image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
    });

    // Xóa tất cả file
    setFiles([]);

    // Đặt lại giá trị images trong form
    form.setValue('images', []);
  };

  // Khởi tạo images từ initialData
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        categoryIds: initialData.categories?.map((item) => item?._id) || [],
      });
      if (initialData?.images?.length) {
        // Cập nhật giá trị của trường images trong form
        form.setValue('images', initialData.images);
      }
    }
  }, [initialData, form]);

  // Cleanup function khi component unmount
  useEffect(() => {
    return () => {
      // Lấy giá trị hiện tại của trường images
      const currentImages = form.getValues('images') || [];

      // Revoke tất cả URL
      currentImages.forEach((image: string) => {
        if (image && image.startsWith('blob:')) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [form]);

  const handleGetCategories = (search: string) => {
    const normalizedSearch = normalizeString(search);

    setFilteredCategories(
      categoriesList.filter((item) => {
        const normalizedName = normalizeString(item.name || '');
        return normalizedName.includes(normalizedSearch);
      }),
    );
  };

  useEffect(() => {
    setFilteredCategories(categoriesList);
  }, [categoriesData, categoriesList]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PageContentHeader
            title={initialData ? 'Sửa sản phẩm' : 'Thêm mới sản phẩm'}
            headerExtra={
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  color={'destructive'}
                  onClick={goBack}
                  disabled={loading}
                >
                  Hủy bỏ
                </Button>
                <Button type="submit" isLoading={loading} disabled={loading}>
                  {initialData ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            }
          />
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex w-full flex-col gap-y-4 md:w-2/3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Mô tả</FormLabel>
                    <FormControl>
                      <CustomEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full flex-col gap-y-4 overflow-hidden md:w-1/3 ">
              <FormField
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Phân loại</FormLabel>
                    <SearchableSelect
                      options={filteredCategories.map((category) => ({
                        label: category.name,
                        value: category._id,
                      }))}
                      multiple
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Chọn phân loại"
                      onSearch={handleGetCategories}
                      minSearchLength={3}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Giá bán</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá bán"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá gốc</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá gốc"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel required>Hình ảnh</FormLabel>
                    <div className="flex flex-col items-start gap-4">
                      <div className="grid grid-cols-3 gap-2">
                        {watchedImages && watchedImages.length > 0 ? (
                          watchedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <Image
                                className="aspect-square rounded-sm object-cover"
                                src={resolveImageUrl(image) || '/default.png'}
                                alt={`product_image_${index}`}
                                width={120}
                                height={120}
                                onError={(e) =>
                                  (e.currentTarget.srcset = '/default.png')
                                }
                              />
                              <div className="absolute inset-0 cursor-pointer hover:bg-black/30 [&:hover>svg]:block">
                                <X
                                  size={24}
                                  className="absolute right-0 top-0 hidden stroke-white/80"
                                  onClick={() => handleRemoveImage(index)}
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <Label
                            htmlFor="imagesUploader"
                            className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-sm border border-dashed"
                          >
                            <p className="text-muted-foreground text-sm">
                              Chưa có ảnh
                            </p>
                          </Label>
                        )}
                      </div>
                      <div className="flex items-center gap-6">
                        <Label>
                          <p className="text-primary inline cursor-pointer underline">
                            Tải ảnh lên
                          </p>
                          {/* <p className="text-destructive ml-1 inline no-underline">
                          *
                        </p> */}
                          <input
                            ref={imagesInputRef}
                            id="imagesUploader"
                            type="file"
                            hidden
                            multiple
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </Label>
                        {watchedImages?.length >= 2 && (
                          <p
                            className="text-primary inline cursor-pointer underline"
                            onClick={handleRemoveAllImages}
                          >
                            Xóa tất cả
                          </p>
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ProductStatus.DRAFT}>
                          Nháp
                        </SelectItem>
                        <SelectItem value={ProductStatus.ACTIVE}>
                          Hoạt động
                        </SelectItem>
                        <SelectItem value={ProductStatus.INACTIVE}>
                          Không hoạt động
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
