export const COMMON_CONST = {
  BCRYPT_HASH_ROUND: 12,
  UNIT_BILLION: 1000000000,
  OTP_LENGTH: 6,
  DEFAULT_PAGE_LIMIT: 10,
  DEFAULT_PAGE: 1,
  DEFAULT_SORT: 'createdAt',
};

export const OTP_CONST = {
  LENGTH: 6,
  EFFECTIVE_TIME: 1 * 60000, // 300 second
  TIMES_LIMIT: 5,
  ONE_DAY: 24 * 60 * 60000,
  BLOCK_DURATIONS: 24 * 60 * 60000, // 24 hours
};

export const STRONG_PASSWORD = {
  config: {
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  },
  message:
    'Password must be at least 8 characters long and contain at least 1 number, 1 lowercase letter, 1 uppercase letter, and 1 symbol',
};

export const PERMISSION_METADATA = 'permissions';
