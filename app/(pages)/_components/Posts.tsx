"use client";

import { usePosts } from "@/app/_service/use-post-queries";
import Link from "next/link";

const Posts = () => {
  // 서버에서 pre-fetch 된 데이터는 자동으로 hydration
  // staleTime이 지나면 클라이언트에서 재요청
  const { data: posts } = usePosts();

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-md">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          <Link
            href={`/posts/${post.id}`}
            className="text-blue-500 mt-2 inline-block"
          >
            자세히 보기
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
