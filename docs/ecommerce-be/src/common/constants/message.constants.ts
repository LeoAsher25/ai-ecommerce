export const MessageConstants = {
  //#region Success
  SUCCESS: 'Thành công',
  DELETE_SUCCESS: 'Xóa thành công',
  UPDATE_SUCCESS: 'Cập nhật thành công',
  CREATE_SUCCESS: 'Tạo thành công',
  //#endregion
};

//#region with code
const MessageWithCodeConstants = {
  //#region Auth

  USE_ADMIN_LOGIN: {
    message: 'Vui lòng sử dụng API admin/auth/login để đăng nhập vào hệ thống quản trị',
    code: 'USE_ADMIN_LOGIN',
  },

  EMAIL_IS_NOT_REGISTERED: {
    message: 'Email does not belong to any account',
    code: 'EMAIL_IS_NOT_REGISTERED',
  },

  EMAIL_IS_NOT_FOUND: {
    message: 'Email is not found',
    code: 'EMAIL_IS_NOT_FOUND',
  },

  EMAIL_ALREADY_EXISTS: {
    message: 'Email already exists',
    code: 'EMAIL_ALREADY_EXISTS',
  },

  EMAIL_IS_NOT_VERIFIED: {
    message: 'Email chưa được xác minh',
    code: 'EMAIL_IS_NOT_VERIFIED',
  },

  EMAIL_ALREADY_VERIFIED: {
    message: 'Email is already verified',
    code: 'EMAIL_ALREADY_VERIFIED',
  },

  EMAIL_OR_PASSWORD_IS_INCORRECT: {
    message: 'Email or password is incorrect',
    code: 'EMAIL_OR_PASSWORD_IS_INCORRECT',
  },

  TOKEN_EXPIRED: {
    message: 'Token is expired',
    code: 'TOKEN_EXPIRED',
  },
  TOKEN_INVALID: {
    message: 'Token is invalid',
    code: 'TOKEN_INVALID',
  },
  OTP_INVALID: {
    message: 'OTP is invalid',
    code: 'OTP_INVALID',
  },

  OTP_EXPIRED: {
    message: 'OTP is expired',
    code: 'OTP_EXPIRED',
  },
  PERMISSION_DENIED_ACTION: {
    message: 'Bạn không có quyền thực hiện hành động này',
    code: 'PERMISSION_DENIED_ACTION',
  },
  PERMISSION_DENIED_RESOURCE: {
    message: 'Bạn không có quyền truy cập vào tài nguyên này',
    code: 'PERMISSION_DENIED_RESOURCE',
  },
  //#endregion

  //#region Product Category
  PRODUCT_CATEGORY_ALREADY_EXISTS: {
    message: 'Tên phân loại đã tồn tại',
    code: 'PRODUCT_CATEGORY_ALREADY_EXISTS',
  },

  PRODUCT_CATEGORY_NOT_FOUND: {
    message: 'Không tìm thấy phân loại',
    code: 'PRODUCT_CATEGORY_NOT_FOUND',
  },
  PRODUCT_CATEGORY_PARENT_NOT_FOUND: {
    message: 'Không tìm thấy phân loại cha',
    code: 'PRODUCT_CATEGORY_PARENT_NOT_FOUND',
  },

  PRODUCT_CATEGORY_HAS_PRODUCT: {
    message: 'Phân loại này có sản phẩm',
    code: 'PRODUCT_CATEGORY_HAS_PRODUCT',
  },

  PRODUCT_CATEGORY_HAS_CHILD: {
    message: 'Phân loại này có phân loại con',
    code: 'PRODUCT_CATEGORY_HAS_CHILD',
  },

  PRODUCT_CATEGORY_PARENT_INACTIVE: {
    message: 'Phân loại cha không hoạt động',
    code: 'PRODUCT_CATEGORY_PARENT_INACTIVE',
  },
  //#endregion
};
export default MessageWithCodeConstants;
