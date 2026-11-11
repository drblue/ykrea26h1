import { useQuery } from "@tanstack/react-query";
import { searchByDate } from "../services/HackerNewsAPI";

const useHackerNewsSearch = (query: string, page: number, hitsPerPage: number) => {
	return useQuery({
		queryKey: ["search-hn", { query, page, hitsPerPage }],
		queryFn: () => searchByDate(query, page - 1, hitsPerPage),
		enabled: !!query,
	});
}

export default useHackerNewsSearch;
