import { useQuery } from "@tanstack/react-query";
import { searchStories, type SearchSort } from "../services/HackerNewsAPI";

const useHackerNewsSearch = (query: string, page: number, hitsPerPage: number, sort: SearchSort = "latest") => {
	return useQuery({
		queryKey: ["search-hn", { query, page, hitsPerPage, sort }],
		queryFn: () => searchStories(query, page - 1, hitsPerPage, sort),
		enabled: !!query,
	});
}

export default useHackerNewsSearch;
