import { Hydrate, getDehydratedQuery } from "@/shared/utils";
import postQueryOptions from "@/app/_service/queries";
import { Posts } from "@/app/(pages)/_components";

// 서버 컴포넌트에서 data pre-fetching
export default async function PostsPage() {
  const { queryKey, queryFn } = postQueryOptions.all();
  const qeury = getDehydratedQuery({ queryKey, queryFn });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">포스트 목록</h1>

      <Hydrate state={qeury}>
        <Posts />
      </Hydrate>
    </main>
  );
}
