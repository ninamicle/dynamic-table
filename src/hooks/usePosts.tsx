import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { useState } from "react";
import { Filters } from "../types/table";
export const getPostsQuery = () => {
  const [filter, setFilter] = useState<Filters | undefined>();

  const query = useInfiniteQuery({
    queryKey: ["posts", filter],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [, filter] = queryKey;
      return filter
        ? await getPosts(pageParam, filter as Filters)
        : await getPosts(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return { ...query, setFilter };
};
