import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  type UseSuspenseInfiniteQueryOptions,
  type UseSuspenseInfiniteQueryResult,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

/**
 * @description react-query 훅을 사용하기 위한 공용 커스텀 훅
 * 데이터를 fetch 하는 곳에서 외부 라이브러리 (여기서는 react-query) 에 대한 의존성을 줄이기 위해 사용
 */

/**
 * 모든 쿼리 훅에 공통적으로 적용되는 기본 옵션
 */
export const defaultQueryOptions = {
  staleTime: 1000 * 60 * 5, // 5분
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

/**
 * 기본 쿼리 옵션 타입
 */
type BaseQueryOptions<TQueryFnData, TQueryKey extends QueryKey> = {
  queryKey: TQueryKey;
  queryFn: () => Promise<TQueryFnData>;
};

export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: BaseQueryOptions<TQueryFnData, TQueryKey> &
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
): UseQueryResult<TData, TError> {
  return useQuery({
    ...defaultQueryOptions,
    ...options,
  });
}

export function useAppSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: BaseQueryOptions<TQueryFnData, TQueryKey> &
    Omit<
      UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
): UseSuspenseQueryResult<TData, TError> {
  return useSuspenseQuery({
    ...defaultQueryOptions,
    ...options,
  });
}

export function useAppInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey,
    TPageParam
  >
): UseInfiniteQueryResult<TData, TError> {
  return useInfiniteQuery({
    ...defaultQueryOptions,
    ...options,
  });
}

export function useAppSuspenseInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>(
  options: UseSuspenseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey,
    TPageParam
  >
): UseSuspenseInfiniteQueryResult<TData, TError> {
  return useSuspenseInfiniteQuery({
    ...defaultQueryOptions,
    ...options,
  });
}

export function useAppMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation({
    mutationFn,
    ...options,
  });
}
