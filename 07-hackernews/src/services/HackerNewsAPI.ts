
/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */
import axios from "axios";
import type { HN_SearchResponse } from "./HackerNewsAPI.types";

const BASE_URL = "https://hn.algolia.com/api/v1";

/**
 * Search Hacker News Stories by date
 *
 * @param query Query to search for
 * @param page Page of search results to get
 */
export const searchByDate = async (query: string, page = 0) => {
	const res = await axios.get<HN_SearchResponse>(BASE_URL + "/search_by_date", {
		params: {
			query,
			tags: "story",
			page,
		}
	});
	return res.data;
}
