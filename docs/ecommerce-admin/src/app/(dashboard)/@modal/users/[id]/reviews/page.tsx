import { Await } from '@/components/common/Await';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from '@/components/ui';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { reviewService } from '@/services/review';
import { Suspense } from 'react';
import { UserReviewsContent } from './content';

export default async function UserReviewsPage(props: {
  searchParams?: Promise<{
    search?: string;
    user?: string;
    page?: string;
    limit?: string;
  }>;
  params?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const userId = Number(params?.id || '');
  const search = searchParams?.search || '';
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || DEFAULT_PAGE_SIZE;

  const promise = reviewService.getReviews({
    page,
    limit,
    search,
    userId,
  });

  return (
    <Dialog open={true}>
      <DialogContent className="min-w-[80vw] !max-w-[80vw]" useRouter>
        <DialogHeader>
          <DialogTitle>Review của người dùng</DialogTitle>
        </DialogHeader>

        <div className="h-full max-h-[80vh] max-w-[inherit] overflow-auto">
          <div className="p-8 pt-6 font-light">
            <Suspense fallback={<Loading />}>
              <Await promise={promise}>
                {({ success, data }) => (
                  <UserReviewsContent
                    userId={userId}
                    limit={limit}
                    initialData={success ? data.data : []}
                  />
                )}
              </Await>
            </Suspense>
            {}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Loading() {
  return (
    <>
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, idx) => (
        <div
          key={idx}
          className="[&:not(:last-child)]:border-border grid grid-cols-5 gap-8 [&:not(:last-child)]:mb-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-8"
        >
          <div className="col-span-1 flex flex-col gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="col-span-4 flex flex-col">
            <Skeleton className="size-full" />
            <Skeleton className="mt-4 h-6 w-[150px]" />
          </div>
        </div>
      ))}
    </>
  );
}
