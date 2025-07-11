import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from '@/components/ui';
import { Suspense } from 'react';
import { Await } from '@/components/common/Await';
import { UpsertUserForm } from './form';
import { userService } from '@/services';

export default async function UpsertUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);

  const promise = id ? userService.getUserDetail(id) : Promise.resolve(null);

  return (
    <Dialog open={true}>
      <DialogContent useRouter>
        <DialogHeader>
          <DialogTitle>Thêm thông tin người dùng</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Loading />}>
          <Await promise={promise}>
            {(resp) => (
              <UpsertUserForm data={resp?.success ? resp?.data : null} />
            )}
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
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <DialogFooter className="flex justify-end gap-4">
        <Skeleton className="h-11 w-20" />
        <Skeleton className="h-11 w-20" />
      </DialogFooter>
    </>
  );
}
