import type { Post } from "@/app/_model/types";

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const getPost = async (postId: number): Promise<Post> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
};

export const postApi = {
  getPosts,
  getPost,
} as const;
