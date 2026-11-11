/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */
import axios from "axios";
import type { HN_SearchResponse } from "./HackerNewsAPI.types";

const BASE_URL = "https://hn.algolia.com/api/v1";

export type SearchSort = "latest" | "relevance";

/**
 * Search Hacker News Stories
 *
 * @param query Query to search for
 * @param page Page of search results to get
 * @param hitsPerPage Number of search results per page
 * @param sort Sort order (default _latest_)
 */
export const searchStories = async (query: string, page = 0, hitsPerPage = 20, sort: SearchSort = "latest") => {
	const endpoint = sort === "relevance" ? "/search" : "/search_by_date";
	const res = await axios.get<HN_SearchResponse>(BASE_URL + endpoint, {
		params: {
			query,
			tags: "story",
			page,
			hitsPerPage,
		}
	});
	return res.data;
}
