import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../api/comments";
import { useState } from "react";
import { Filters } from "../types/table";

export const getCommentsQuery = () => {
  const [filter, setFilter] = useState<Filters | undefined>();

  const query = useInfiniteQuery({
    queryKey: ["comments", filter],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [, filter] = queryKey;
      return filter
        ? await getComments(pageParam, filter as Filters)
        : await getComments(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return { ...query, setFilter };
};
