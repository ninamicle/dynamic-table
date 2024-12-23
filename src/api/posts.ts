import axios from "axios";
import { Filters } from "../types/table";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

export const getPosts = async (pageNumber: number, filter?: Filters) => {
  const { data } = await api.get(`?_page=${pageNumber}`);

  if (!filter) {
    return data;
  }

  return data.filter((post: any) => {
    return Object.entries(filter).every(([key, value]) => {
      const postValue = post[key]?.toString().toLowerCase();
      const filterValue = value.toString().toLowerCase();
      return postValue.includes(filterValue);
    });
  });
};
