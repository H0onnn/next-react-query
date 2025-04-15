import { useAppSuspenseQuery } from "@/shared/hooks";
import postQueryOptions from "@/app/_service/queries";

export const usePosts = () => {
  return useAppSuspenseQuery(postQueryOptions.all());
};

export const usePost = (postId: number) => {
  return useAppSuspenseQuery(postQueryOptions.detail(postId));
};
