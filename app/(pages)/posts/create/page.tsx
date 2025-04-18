"use client";

import { useCreatePost } from "@/app/_service/use-post-queries";

export default function CreatePostPage() {
  const { mutate: createPost, isPending } = useCreatePost();

  return (
    <div>
      <button
        className="border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={() => createPost({ title: "test", body: "test" })}
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </div>
  );
}
