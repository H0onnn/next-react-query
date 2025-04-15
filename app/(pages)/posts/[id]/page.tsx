import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import postQueryOptions from "@/app/_service/queries";
import { PostDetails } from "./_components";
import { getQueryClient } from "@/shared/utils";

type Params = Promise<{ id: string }>;

// 서버 컴포넌트에서 data pre-fetching
export default async function PostDetailPage({ params }: { params: Params }) {
  const postId = parseInt((await params).id);
  const { queryKey, queryFn } = postQueryOptions.detail(postId);

  const queryClient = getQueryClient();

  queryClient.prefetchQuery({ queryKey, queryFn });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">포스트 상세</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetails postId={postId} />
      </HydrationBoundary>
    </main>
  );
}
