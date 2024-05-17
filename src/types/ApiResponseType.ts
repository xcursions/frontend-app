export type ApiResponseTypes<R> = {
  success: boolean;
  error_code: string | null;
  data?: R;
};
