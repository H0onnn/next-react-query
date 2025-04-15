## from tkdodo

새로운 Server Components 앱을 막 시작하는 경우, 프레임워크에서 제공하는 데이터 가져오기 도구를 먼저 사용하고 실제로 필요할 때까지 React Query를 사용하지 않는 것이 좋습니다.
절대 사용하지 않을 수도 있지만, 괜찮습니다. 작업에 적합한 도구를 사용하세요!

React Query 관점에서 서버 컴포넌트를 데이터를 미리 가져오는 장소로만 취급하세요.

## 정리

**hydrate & dehydrate**

1. `dehydrate`
- 서버에서 react-query의 상태를 클라이언트로 전송할 수 있는 형태로 만들기 위해 사용
- 서버에서 데이터를 가져온 후, 이를 직렬화 하여 클라이언트로 전송한다.
- 직렬화된 데이터는 `DehydratedState` 형태로 표현되며, 클라이언트 측에서 `hydrate` 함수를 통해 다시 query state로 변환된다.

2. `hydrate`
- 클라이언트 측에서 직렬화된 상태를 받아 react query의 상태로 변환
- 서버에서 미리 가져온 데이터를 클라이언트의 query cache에 적용하여, 네트워크 요청 없이 데이터를 사용할 수 있게 한다.

**단일 instance query**

일반적으로 데이터를 fetch하는 각 서버 컴포넌트에서 새로운 queryClient를 생성하는 방식이 권장되지만,
getQueryClient 함수를 react cache 함수로 감쌀 경우 단일 instance를 가지는 query client를 생성할 수 있음
  
1. 장점 : 유틸리티 함수를 포함한 getQueryClient 함수가 호출되는 모든 곳에서 동일한 query client를 사용할 수 있음
2. 단점 : dehydrate(getQueryClient()) 를 호출할 때 마다 이전에 직렬화된 query를 포함한 현재의 서버 컴포넌트에서 불필요한 query를 모두 재직렬화 하여 오버헤드 발생

유용할 수 있는 상황 : Nextjs의 fetch 함수는 내부적으로 중복 요청을 제거하기 때문에 새로운 query client를 생성하는 것이 괜찮을 수 있으나,
queryFn에서 fetch api가 아닌 다른 것 (axios 등) 을 사용하는 등의 상항에서는 불필요한 재직렬화에도 불구하고 cache 함수를 사용하는 것이 합리적일 수 있음

**Streaming with Server Components**

React Query v5.40.0부터는 아직 완료되지 않은(pending) 쿼리도 클라이언트로 전송될 수 있기 때문에 모든 pre-fetch를 await할 필요가 없다.
이렇게 하면 가능한 빨리 pre-fetch를 시작할 수 있으며, 전체 Suspense 경계를 차단하지 않고도 쿼리가 완료되는 대로 데이터를 클라이언트로 스트리밍할 수 있다.
 
유용한 상황 :
1. 사용자 상호작용 후에만 보이는 콘텐츠를 미리 가져올 때
2. 무한 스크롤에서 첫 페이지는 기다렸다가 렌더링하고, 동시에 두 번째 페이지는 렌더링을 차단하지 않고 미리 가져오고 싶을 때
3. 단점 : 데이터를 사용하는 곳에서 useSuspenseQuery를 사용하지 않고, useQuery를 사용할 경우 Suspend 되지 않기 때문에, 서버 렌더링이 불가능해지며, 클라이언트에서만 렌더링 된다.
  
이 기능을 사용하기 위해 getQueryClient 함수를 query-provider.tsx에서 분리한다.
서버 컴포넌트와 클라이언트 provider 모두에서 사용해야 하기 때문이다.

## 주의사항

`staleTime` 은 서버에서 데이터를 가져온 시점을 기준으로 한다.
   
