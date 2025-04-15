"use client";

import Link from "next/link";
import { usePost } from "@/app/_service/use-post-queries";

interface PostDetailsProps {
  postId: number;
}

const PostDetails = ({ postId }: PostDetailsProps) => {
  const { data: post } = usePost(postId);

  return (
    <article className="space-y-4">
      <div className="border p-4 rounded-md">
        <h1 className="text-xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <div className="text-sm text-gray-500">사용자 ID: {post.userId}</div>
      </div>

      <div className="mt-4">
        <Link href="/" className="text-blue-500">
          ← 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
};

export default PostDetails;
