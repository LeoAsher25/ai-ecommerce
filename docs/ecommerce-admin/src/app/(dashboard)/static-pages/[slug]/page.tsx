import Loading from '@/app/loading';
import { Await } from '@/components/common/Await';
import { Button, Badge } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { staticPageService } from '@/services/staticPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Pencil } from 'lucide-react';

// Map for category display names
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  about: 'Về chúng tôi',
  'customer-service': 'Dịch vụ khách hàng',
  policy: 'Chính sách',
  terms: 'Điều khoản',
  other: 'Khác',
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const { success, data } = await staticPageService.getStaticPage(slug);

  if (!success || !data) {
    return {
      title: 'Trang tĩnh không tồn tại',
    };
  }

  return {
    title: `${data.title} - Trang tĩnh`,
    description: data.metaDescription,
  };
}

export default async function StaticPageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const staticPagePromise = staticPageService.getStaticPage(slug);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Await promise={staticPagePromise}>
          {({ success, data }) => {
            if (!success || !data) {
              notFound();
            }

            return (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">{data.title}</h1>
                  <Button asChild>
                    <Link href={`${APP_ROUTES.STATIC_PAGES}/edit/${data.slug}`}>
                      <Pencil className="mr-2 size-4" />
                      Chỉnh sửa
                    </Link>
                  </Button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg border p-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">
                      Thông tin cơ bản
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Slug:</span> {data.slug}
                      </div>
                      {data.metaDescription && (
                        <div>
                          <span className="font-semibold">Mô tả meta:</span>{' '}
                          {data.metaDescription}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold">Trạng thái:</span>{' '}
                        <Badge
                          customColor={data.isActive ? '#258D01' : '#DE1515'}
                        >
                          {data.isActive ? 'Hoạt động' : 'Không hoạt động'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">
                      Cài đặt hiển thị
                    </h3>
                    <div className="space-y-2">
                      {data.metadata?.category && (
                        <div>
                          <span className="font-semibold">Danh mục:</span>{' '}
                          {CATEGORY_DISPLAY_NAMES[data.metadata.category] ||
                            data.metadata.category}
                        </div>
                      )}
                      {data.metadata?.order !== undefined && (
                        <div>
                          <span className="font-semibold">
                            Thứ tự hiển thị:
                          </span>{' '}
                          {data.metadata.order}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold">
                          Hiển thị ở footer:
                        </span>{' '}
                        <Badge
                          customColor={
                            data.metadata?.showInFooter ? '#258D01' : '#DE1515'
                          }
                        >
                          {data.metadata?.showInFooter ? 'Có' : 'Không'}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-semibold">
                          Hiển thị ở header:
                        </span>{' '}
                        <Badge
                          customColor={
                            data.metadata?.showInHeader ? '#258D01' : '#DE1515'
                          }
                        >
                          {data.metadata?.showInHeader ? 'Có' : 'Không'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Nội dung</h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  />
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
