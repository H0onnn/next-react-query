## from tkdodo

새로운 Server Components 앱을 막 시작하는 경우, 프레임워크에서 제공하는 데이터 가져오기 도구를 먼저 사용하고 실제로 필요할 때까지 React Query를 사용하지 않는 것이 좋습니다.
절대 사용하지 않을 수도 있지만, 괜찮습니다. 작업에 적합한 도구를 사용하세요!

React Query 관점에서 서버 컴포넌트를 데이터를 미리 가져오는 장소로만 취급하세요.

## 정리

**hydrate & dehydrate**

1. `hydrate`
   서버에서 react-query의 상태를 클라이언트로 전송할 수 있는 형태로 만들기 위해 사용
   <br />
