import {
  QueryClient,
  isServer,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

/**
 * 주석1)
 *
 * React Query v5.40.0부터는 아직 완료되지 않은(pending) 쿼리도 클라이언트로 전송될 수 있기 때문에 모든 프리페치를 await할 필요가 없다
 * 이렇게 하면 가능한 빨리 pre-fetch를 시작할 수 있으며, 전체 Suspense 경계를 차단하지 않고도 쿼리가 완료되는 대로 데이터를 클라이언트로 스트리밍할 수 있다
 *
 * 유용한 상황 :
 * 1. 사용자 상호작용 후에만 보이는 콘텐츠를 미리 가져올 때
 * 2. 무한 스크롤에서 첫 페이지는 기다렸다가 렌더링하고, 동시에 두 번째 페이지는 렌더링을 차단하지 않고 미리 가져오고 싶을 때
 *
 * 단점 : 데이터를 사용하는 곳에서 useSuspenseQuery를 사용하지 않고, useQuery를 사용할 경우 Suspend 되지 않기 때문에,
 * 서버 렌더링이 불가능해지며, 클라이언트에서만 렌더링 된다.
 *
 * 이 기능을 사용하기 위해 getQueryClient 함수를 query-provider.tsx에서 분리한다
 * 서버 컴포넌트와 클라이언트 provider 모두에서 사용해야 하기 때문이다
 */

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 환경에서는 보통 클라이언트에서 즉시 재요청하는 것을 방지하기 위해
        // staleTime을 0보다 큰 값으로 설정
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          // pending 상태의 쿼리도 dehydrate에 포함하여 데이터를 전송
          query.state.status === "pending",
        shouldRedactErrors: (error) => {
          console.error("query client error", error);
          return false;
        },
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * 주석2)
 *
 * 일반적으로 데이터를 fetch하는 각 서버 컴포넌트에서 새로운 queryClient를 생성하는 방식이 권장되지만,
 * getQueryClient 함수를 react cache 함수로 감쌀 경우 단일 instance를 가지는 query client를 생성할 수 있음
 *
 * 장점 : 유틸리티 함수를 포함한 getQueryClient 함수가 호출되는 모든 곳에서 동일한 query client를 사용할 수 있음
 * 단점 : dehydrate(getQueryClient()) 를 호출할 때 마다 이전에 직렬화된 query를 포함한 현재의 서버 컴포넌트에서 불필요한 query를 모두 재직렬화 하여 오버헤드 발생
 *
 * 유용할 수 있는 상황 : Nextjs의 fetch 함수는 내부적으로 중복 요청을 제거하기 때문에 새로운 query client를 생성하는 것이 괜찮을 수 있으나,
 * queryFn에서 fetch api가 아닌 다른 것 (axios 등) 을 사용하는 등의 상항에서는 불필요한 재직렬화에도 불구하고 cache 함수를 사용하는 것이 합리적일 수 있음
 */
export const getQueryClient = () => {
  if (isServer) {
    // 서버 환경에서는 항상 새로운 쿼리 클라이언트 생성
    return makeQueryClient();
  } else {
    // 브라우저 환경에서는 이미 생성된 쿼리 클라이언트가 없는 경우에만 새로 생성
    // *React가 초기 렌더링 중에 일시 중단되는 경우 새 클라이언트를 다시 만들지 않기 위함
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
