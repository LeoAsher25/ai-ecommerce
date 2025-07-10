import Loading from '@/app/loading';
import { Await } from '@/components/common/Await';
import { staticPageService } from '@/services/staticPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import StaticPageForm from '../../components/form';

export const metadata: Metadata = {
  title: 'Chỉnh sửa trang tĩnh',
  description: 'Chỉnh sửa trang tĩnh',
};

export default async function EditStaticPagePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const staticPagePromise = staticPageService.getStaticPage(slug);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Chỉnh sửa trang tĩnh</h1>
      <Suspense fallback={<Loading />}>
        <Await promise={staticPagePromise}>
          {({ success, data }) => {
            if (!success || !data) {
              notFound();
            }
            return <StaticPageForm initialData={data} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
