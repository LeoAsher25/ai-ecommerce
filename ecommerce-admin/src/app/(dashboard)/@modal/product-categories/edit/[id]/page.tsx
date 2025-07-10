import { Await } from '@/components/common/Await';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from '@/components/ui';
import { productCategoryService } from '@/services/productCategories';
import { Suspense } from 'react';
import { EditProductCategoryForm } from './form';

export default async function EditProductCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = String((await params).id);

  const promiseDetail = productCategoryService.getProductCategoryDetail(id);
  const title = id ? 'Sửa phân loại' : 'Thêm phân loại';

  return (
    <Dialog open={true}>
      <DialogContent useRouter>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Loading />}>
          <Await promise={promiseDetail}>
            {({ success, data }) => {
              return (
                <EditProductCategoryForm
                  category={success ? data : undefined}
                />
              );
            }}
          </Await>
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

function Loading() {
  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <DialogFooter className="flex justify-end gap-6">
        <Skeleton className="h-11 w-14" />
        <Skeleton className="h-11 w-14" />
      </DialogFooter>
    </>
  );
}
