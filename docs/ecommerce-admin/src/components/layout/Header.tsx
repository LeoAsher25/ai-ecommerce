'use client';
import { SidebarTrigger, useSidebar } from '../ui';
import { Image } from '@/components/common/Image';

export function Header() {
  const { isMobile } = useSidebar();

  if (isMobile) {
    return (
      <div className="bg-sidebar text-sidebar-foreground px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-row items-center justify-start gap-2 text-sm font-bold">
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={30}
              className="inline-block"
            />
          </div>
          <SidebarTrigger className="size-6 [&_svg]:size-6" />
        </div>
      </div>
    );
  }

  return null;
}
