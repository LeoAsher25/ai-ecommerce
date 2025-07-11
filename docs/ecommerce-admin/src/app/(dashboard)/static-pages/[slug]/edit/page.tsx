import { staticPageService } from '@/services/staticPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StaticPageForm } from '../../form';

export const metadata: Metadata = {
  title: 'Chỉnh sửa trang tĩnh',
};

export default async function EditStaticPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { success, data } = await staticPageService.getStaticPage(slug);

  if (!success || !data) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Chỉnh sửa trang tĩnh</h1>
      <StaticPageForm initialData={data} />
    </div>
  );
}
