import DynamicTable from "../components/Table/Table";
import { getPostsQuery } from "../hooks/usePosts";
import { Column } from "../types/table";

const columns: Column[] = [
  {
    key: "title",
    label: "Title",
    type: "string",
    width: "w-1/4",
    hasFilter: true,
  },
  {
    key: "body",
    label: "Body",
    type: "string",
    width: "w-2/4",
    hasFilter: true,
  },
];

export default function Posts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, setFilter } =
    getPostsQuery();

  const res = data?.pages.flatMap((page) => page) || [];
  return (
    <DynamicTable
      scrolableId="scrolable-posts"
      columns={columns}
      data={res}
      loadMore={fetchNextPage}
      isLoading={isFetchingNextPage}
      hasMore={hasNextPage}
      setFilter={setFilter}
      isSelectable={true}
    />
  );
}
