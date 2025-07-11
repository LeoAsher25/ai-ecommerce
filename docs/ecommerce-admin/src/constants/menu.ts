import { APP_ROUTES } from './routes';

// Menu items.
const menuItems = [
  [
    {
      title: 'Dashboard',
      url: APP_ROUTES.DASHBOARD,
    },
    {
      title: 'Quản lý đơn hàng',
      url: APP_ROUTES.ORDERS,
    },
    {
      title: 'Quản lý người dùng',
      url: APP_ROUTES.USERS,
    },
    {
      title: 'Quản lý sản phẩm',
      url: APP_ROUTES.PRODUCTS,
    },
    {
      title: 'Quản lý phân loại',
      url: APP_ROUTES.PRODUCT_CATEGORIES,
    },
    {
      title: 'Quản lý trang tĩnh',
      url: APP_ROUTES.STATIC_PAGES,
    },
  ],
];

export default menuItems;
