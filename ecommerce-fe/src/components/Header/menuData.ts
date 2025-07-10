import { APP_ROUTES } from '@/constants/routes'
import { Menu } from '@/types/Menu'

export const menuData: Menu[] = [
  {
    id: '1',
    name: 'Phổ biến',
    newTab: false,
    path: APP_ROUTES.HOME,
  },
  {
    id: '2',
    name: 'Cửa hàng',
    newTab: false,
    path: APP_ROUTES.SHOP,
  },
  // {
  //   id: "3",
  //   name: "Liên hệ",
  //   newTab: false,
  //   path: APP_ROUTES.CONTACT,
  // },
  // {
  //   id: "6",
  //   name: "pages",
  //   newTab: false,
  //   path: "/",
  //   submenu: [
  //     {
  //       id: "61",
  //       name: "Shop With Sidebar",
  //       newTab: false,
  //       path: "/shop-with-sidebar",
  //     },
  //     {
  //       id: "62",
  //       name: "Shop Without Sidebar",
  //       newTab: false,
  //       path: "/shop-without-sidebar",
  //     },
  //     {
  //       id: "64",
  //       name: "Checkout",
  //       newTab: false,
  //       path: "/checkout",
  //     },
  //     {
  //       id: "65",
  //       name: "Cart",
  //       newTab: false,
  //       path: "/cart",
  //     },
  //     {
  //       id: "66",
  //       name: "Wishlist",
  //       newTab: false,
  //       path: "/wishlist",
  //     },
  //     {
  //       id: "67",
  //       name: "Sign in",
  //       newTab: false,
  //       path: "/signin",
  //     },
  //     {
  //       id: "68",
  //       name: "Sign up",
  //       newTab: false,
  //       path: "/signup",
  //     },
  //     {
  //       id: "69",
  //       name: "My Account",
  //       newTab: false,
  //       path: "/my-account",
  //     },
  //     {
  //       id: "70",
  //       name: "Contact",
  //       newTab: false,
  //       path: "/contact",
  //     },
  //     {
  //       id: "62",
  //       name: "Error",
  //       newTab: false,
  //       path: "/error",
  //     },
  //     {
  //       id: "63",
  //       name: "Mail Success",
  //       newTab: false,
  //       path: "/mail-success",
  //     },
  //   ],
  // },
  // {
  //   id: '7',
  //   name: "blogs",
  //   newTab: false,
  //   path: "/",
  //   submenu: [
  //     {
  //       id: 71,
  //       title: "Blog Grid with sidebar",
  //       newTab: false,
  //       path: "/blogs/blog-grid-with-sidebar",
  //     },
  //     {
  //       id: 72,
  //       title: "Blog Grid",
  //       newTab: false,
  //       path: "/blogs/blog-grid",
  //     },
  //     {
  //       id: 73,
  //       title: "Blog details with sidebar",
  //       newTab: false,
  //       path: "/blogs/blog-details-with-sidebar",
  //     },
  //     {
  //       id: 74,
  //       title: "Blog details",
  //       newTab: false,
  //       path: "/blogs/blog-details",
  //     },
  //   ],
  // },
]
