import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import postQueryOptions from "@/app/_service/queries";
import { Posts } from "@/app/(pages)/_components";
import { getQueryClient } from "@/shared/utils";

// 서버 컴포넌트에서 data pre-fetching
export default async function PostsPage() {
  const { queryKey, queryFn } = postQueryOptions.all();
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({ queryKey, queryFn });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">포스트 목록</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </main>
  );
}
