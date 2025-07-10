'use client';

import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteButtonWithConfirmProps {
  onDelete: () => Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  buttonVariant?: 'ghost' | 'outline' | 'default';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function DeleteButtonWithConfirm({
  onDelete,
  title = 'Xác nhận xóa',
  description = 'Bạn có chắc chắn muốn xóa mục này?',
  confirmText = 'Xóa',
  cancelText = 'Hủy',
  buttonVariant = 'ghost',
  buttonSize = 'icon',
  className = '',
}: DeleteButtonWithConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      setIsOpen(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={`text-destructive hover:text-destructive ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="size-4" />
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title={title}
        description={description}
        confirmText={confirmText}
        cancelText={cancelText}
        isLoading={isLoading}
      />
    </>
  );
}
