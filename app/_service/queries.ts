import { postApi } from "./api";

// query-key-factory
const postKeys = {
  all: ["posts"] as const,
  detail: (postId: number) => [...postKeys.all, postId] as const,
  detailComments: (postId: number) =>
    [...postKeys.detail(postId), "comments"] as const,
  detailComment: ({
    postId,
    commentId,
  }: {
    postId: number;
    commentId: number;
  }) => [...postKeys.detailComments(postId), commentId] as const,
};

// query-options-factory
const postQueryOptions = {
  all: () => ({
    queryKey: postKeys.all,
    queryFn: postApi.getPosts,
  }),
  detail: (postId: number) => ({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.getPost(postId),
  }),
  create: () => ({
    mutationKey: postKeys.all,
    mutationFn: postApi.createPost,
  }),
};

export default postQueryOptions;
