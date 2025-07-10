import { Metadata } from 'next';
import StaticPageForm from '../components/form';

export const metadata: Metadata = {
  title: 'Thêm mới trang tĩnh',
  description: 'Thêm mới trang tĩnh',
};

export default async function AddStaticPagePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Thêm trang tĩnh mới</h1>
      <StaticPageForm />
    </div>
  );
}
