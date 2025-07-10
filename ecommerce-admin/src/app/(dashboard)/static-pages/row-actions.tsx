import { GlobalLoading } from '@/components/common/GlobalLoading';
import { GlobalModal } from '@/components/common/GlobalModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { staticPageService } from '@/services/staticPage';
import { StaticPage } from '@/services/staticPage/type';
import { revalidate } from '@/actions/revalidate';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface RowActionsProps {
  data: StaticPage;
}

export function RowActions({ data }: RowActionsProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    GlobalLoading.show();
    const { success, message } = await staticPageService.deleteStaticPage(
      data.slug,
    );

    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });

    if (success) {
      await revalidate({ path: APP_ROUTES.STATIC_PAGES, type: 'page' });
    }

    GlobalLoading.hide();
  };

  const confirmDelete = () => {
    GlobalModal.show({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa trang "${data.title}"?`,
      onConfirm: handleDelete,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`${APP_ROUTES.STATIC_PAGES}/${data.slug}/edit`}>
            <Pencil className="mr-2 size-4" />
            Chỉnh sửa
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={confirmDelete}>
          <Trash className="mr-2 size-4" />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
