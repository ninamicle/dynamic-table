import { useState } from "react";
import DynamicTable from "../components/Table/Table";
import { getCommentsQuery } from "../hooks/useComments";
import { Column } from "../types/table";

const columns: Column[] = [
  {
    key: "name",
    label: "Name",
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
  {
    key: "email",
    label: "Email",
    type: "string",
    width: "w-2/4",
    hasFilter: true,
    isCustom: true,
  },
];

export default function Comments() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, setFilter } =
    getCommentsQuery();
  const [showAlert, setShowAlert] = useState(false);

  const res = data?.pages.flatMap((page) => page) || [];
  const customContent = res.reduce((acc, item) => {
    acc[item.id] = {
      email: (
        <a
          href={`mailto:${item.email}`}
          className="text-blue-500 hover:underline"
        >
          {item.email}
        </a>
      ),
      name: (
        <h1 onClick={() => setShowAlert(true)} className="italic">
          {item.name}
        </h1>
      ),
    };
    return acc;
  }, {});

  return (
    <>
      <DynamicTable
        scrolableId="scrolable-comments"
        columns={columns}
        data={res}
        loadMore={fetchNextPage}
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
        setFilter={setFilter}
        customContent={customContent}
      />
      {showAlert && (
        <div
          onClick={() => setShowAlert(!showAlert)}
          className="bg-red-500 text-white p-2"
        >
          Alert
        </div>
      )}
    </>
  );
}
