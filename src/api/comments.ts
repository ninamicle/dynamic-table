import axios from "axios";
import { Filters } from "../types/table";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/comments",
});

export const getComments = async (pageNumber: number, filter?: Filters) => {
  const { data } = await api.get(`?_page=${pageNumber}`);

  if (!filter) {
    return data;
  }

  return data.filter((comment: any) => {
    return Object.entries(filter).every(([key, value]) => {
      const commentValue = comment[key]?.toString().toLowerCase();
      const filterValue = value.toString().toLowerCase();
      return commentValue.includes(filterValue);
    });
  });
};
