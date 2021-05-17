import { useRouter } from "next/router";
import Fuse from "fuse.js";

export const useQueryParamSearch = (allItems, keys, queryParamKey) => {
  const { isReady, query } = useRouter();

  if (!isReady) return { loading: true, filteredList: null, searchText: null };
  const searchText = query[queryParamKey] || "No search criteria given";

  const fuse = new Fuse(allItems, { keys });
  const results = fuse.search(searchText);
  const filteredList = results.map((result) => result.item);

  return { loading: false, filteredList, searchText };
};
