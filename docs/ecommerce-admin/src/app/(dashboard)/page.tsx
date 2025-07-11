'use server';
import { Await } from '@/components/common/Await';
import {
  DoughnutChartBlock,
  LineChartBlock,
  RecentReviewBlock,
  SummarizeBlock,
} from '@/components/common/Dashboard';
import { Block } from '@/components/common/Dashboard/Block';
import { Skeleton } from '@/components/ui';
import { loadCommonFilterParams } from '@/constants';
import { dashboardService } from '@/services/dashboard';

import { getServerSession } from 'next-auth';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { time } = await loadCommonFilterParams(searchParams);
  const session = await getServerSession();

  const promise = dashboardService.getDashboard({ filter: time });

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-semibold md:text-[28px]">
          Xin chào {session?.user.name}!
        </h1>
        <p>Chúc bạn một ngày làm việc hiệu quả!</p>
      </div>
      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {({ success, data }) =>
            success ? (
              <div className="grid grid-cols-[repeat(7,_1fr)] gap-8">
                <div className="col-span-2 flex flex-col gap-6">
                  <SummarizeBlock
                    title="Tổng số người dùng"
                    sum={data.user.total}
                    unit="người"
                    change={data.user.change}
                  />
                  <SummarizeBlock
                    title="Tổng số review"
                    sum={data.review.total}
                    unit="bài"
                    change={data.review.change}
                  />
                  <SummarizeBlock
                    title="Tổng số cơ sở thẩm mỹ"
                    sum={data.cosmetic.total}
                    unit="cơ sở"
                    change={data.cosmetic.change}
                  />
                </div>
                <LineChartBlock
                  className="col-span-5"
                  dataset={data.reviewDataset}
                />
                <div className="col-span-3">
                  <RecentReviewBlock
                    className="mb-6"
                    title="Số review chờ duyệt"
                    unit="Bài"
                    data={data.request.review}
                    href="/approve-reviews"
                  />
                  <RecentReviewBlock
                    title="Yêu cầu thêm cơ sở mới"
                    unit="yêu cầu"
                    data={data.request.cosmetic}
                    href="/cosmetic-requests"
                  />
                </div>
                <DoughnutChartBlock
                  className="col-span-4"
                  dataset={data.cosmeticByCategories}
                />
              </div>
            ) : (
              <Loading />
            )
          }
        </Await>
      </Suspense>
    </div>
  );
}

function Loading() {
  return (
    <div className="grid grid-cols-[repeat(7,_1fr)] gap-8">
      <div className="col-span-2 flex flex-col gap-6">
        <SummarizeBlock
          skeleton
          title="Tổng số người dùng"
          sum={0}
          unit="người"
          change={0}
        />
        <SummarizeBlock
          skeleton
          title="Tổng số review"
          sum={0}
          unit="bài"
          change={0}
        />
        <SummarizeBlock
          skeleton
          title="Tổng số cơ sở thẩm mỹ"
          sum={0}
          unit="cơ sở"
          change={0}
        />
      </div>
      <Block className="col-span-5">
        <Skeleton className="h-[450px] w-full" />
      </Block>
      <div className="col-span-3">
        <RecentReviewBlock
          skeleton
          className="mb-6"
          title="Số review chờ duyệt"
          unit="Bài"
          data={0}
        />
        <RecentReviewBlock
          skeleton
          title="Yêu cầu thêm cơ sở mới"
          unit="yêu cầu"
          data={0}
        />
      </div>
      <Block className="col-span-4 h-[336px]">
        <h4 className="mb-8 font-medium">Phân loại cơ sở</h4>
        <Skeleton className="h-[200px]" />
      </Block>
    </div>
  );
}
