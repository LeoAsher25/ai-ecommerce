'use client';
import { ChevronRight } from 'lucide-react';

import { Image } from '@/components/common/Image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import menuItems from '@/constants/menu';

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, ...props } = useSidebar();
  const pathnameRef = useRef(pathname);

  const { status, data: session } = useSession();

  useEffect(() => {
    if (pathname !== pathnameRef.current && isMobile && props.openMobile) {
      props.setOpenMobile(false);
      pathnameRef.current = pathname;
    }
  }, [isMobile, props, pathname]);
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex flex-row items-center justify-start px-4 py-8 text-sm font-bold">
        {!isMobile && (
          <>
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={50}
              className="inline-block w-auto"
            />
          </>
        )}
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <SidebarGroup key={idx} className="p-0">
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {group.map((item) => (
                    <SidebarMenuItem key={item.title} className="">
                      <SidebarMenuButton
                        asChild
                        className="before:bg-sidebar-accent-foreground h-10 px-4 py-1 transition-all duration-100 ease-in before:absolute before:inset-y-0 before:left-0 before:hidden before:h-full before:w-[6px] data-[active=true]:font-semibold data-[active=true]:before:block"
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {idx < menuItems.length - 1 && (
              <SidebarSeparator className="mx-0 my-2" />
            )}
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center gap-4 px-4 py-8">
        <Avatar>
          <AvatarImage src={session?.user.avatar} alt="avt" />
          <AvatarFallback>
            {(session?.user?.name || '').split(' ').map((v) => v[0])}
          </AvatarFallback>
        </Avatar>
        {status === 'loading' ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <span>{session?.user?.name}</span>
        )}
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger className="ml-auto text-white hover:text-white">
                <ChevronRight />
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Đăng xuất</TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader className="border-b-0">
              <DialogTitle>Bạn có chắc chắn muốn đăng xuất</DialogTitle>
            </DialogHeader>
            <DialogFooter className="gap-2 border-t-0">
              <DialogClose asChild className="relative">
                <Button variant="ghost">Hủy</Button>
              </DialogClose>
              <Button
                variant="default"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                Đồng ý
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
}
