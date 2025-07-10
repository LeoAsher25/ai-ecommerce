import Loading from '@/app/loading';
import { Await } from '@/components/common/Await';
import { productService } from '@/services/product';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductForm from '../../components/form';

export const metadata: Metadata = {
  title: 'Sửa sản phẩm',
  description: 'Sửa sản phẩm',
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = String((await params).id);

  const productDetailPromise = id
    ? productService.getProductDetail(id)
    : Promise.resolve(null);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Await promise={productDetailPromise}>
          {(resp) => (
            <ProductForm initialData={resp?.success ? resp?.data : null} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
