export const getErrorText = error => {
  return (
    error?.data?.message?.toString() ||
    error?.error?.toString() ||
    error?.data?.error?.toString() ||
    'Something went wrong'
  );
};
