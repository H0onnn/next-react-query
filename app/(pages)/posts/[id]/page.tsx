import { Hydrate, getDehydratedQuery } from "@/shared/utils";
import postQueryOptions from "@/app/_service/queries";
import { PostDetails } from "./_components";

type Params = Promise<{ id: string }>;

// 서버 컴포넌트에서 data pre-fetching
export default async function PostDetailPage({ params }: { params: Params }) {
  const postId = parseInt((await params).id);
  const { queryKey, queryFn } = postQueryOptions.detail(postId);
  const qeury = getDehydratedQuery({ queryKey, queryFn });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">포스트 상세</h1>
      <Hydrate state={qeury}>
        <PostDetails postId={postId} />
      </Hydrate>
    </main>
  );
}
