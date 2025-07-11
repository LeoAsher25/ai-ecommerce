import CategoriesPage from '../base-page';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = (await params).type;

  return {
    title:
      'Phân loại' +
      (type === 'cosmetic' ? ' cơ sở' : ' review') +
      ' - Review Thẩm Mỹ',
  };
}

export default CategoriesPage;
