interface CustomError extends Error {
  response?: { data: { message: string } } | null;
  status?: number | null;
}

export default interface HooksTypes {
  data?: any | null;
  isError?: boolean;
  error?: CustomError | null;
  isLoading?: boolean;
  refetch?: () => void;
}
