export type ActionState = {
  success: boolean;
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};
