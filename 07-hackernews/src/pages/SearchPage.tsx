import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router";
import Loading from "../components/Loading";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";

const SearchPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	// const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query=` value from URL
	const searchParamsQuery = searchParams.get("query"); // /search?query=tesla
	console.log("searchParamsQuery:", searchParamsQuery);

	const searchHackerNews = async (searchQuery: string, searchPage: number) => {
		// reset state + set loading
		setError(null);
		setIsLoading(true);
		setSearchResult(null);

		try {
			// call api and search for keyword
			const data = await searchByDate(searchQuery, searchPage);

			// update state with search result
			setSearchResult(data);

		} catch (err) {
			// handle errors
			console.error(`Error thrown when searching for "${searchQuery}":`, err);
			setError(err instanceof Error ? err.message : "Stop throwing things at me that aren't Errors!!!11");

		} finally {
			setIsLoading(false);
		}
	}

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		// 💇 trim the input
		const trimmedInputSearch = inputSearch.trim();

		// prevent smol searches
		if (trimmedInputSearch.length < 3) {
			alert("Too short search query");
			return;
		}

		// search for haxx0rs 🕵
		setSearchParams({ query: trimmedInputSearch });
	}

	useEffect(() => {
		if (!searchParamsQuery) {
			return;
		}

		// oxlint-disable-next-line react/set-state-in-effect
		searchHackerNews(searchParamsQuery, 0);
	}, [searchParamsQuery]);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						type="text"
						value={inputSearch}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{error && <Alert variant="warning">{error}</Alert>}

			{isLoading && <Loading />}

			{searchParamsQuery && searchResult && searchResult.hits.length > 0 && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for <em>{searchParamsQuery}</em>...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action={Boolean(hit.url)} href={hit.url} key={hit.objectID}>
								<h2 className="h3">{hit.title}</h2>
								<div className="d-flex justify-content-between text-muted small">
									<span>{hit.points} points</span>
									<span>by {hit.author}</span>
									<span>{hit.created_at}</span>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								disabled={searchResult.page === 0}
								onClick={() => searchHackerNews(searchParamsQuery, searchResult.page - 1)}
								variant="primary"
							>Previous Page</Button>
						</div>

						<div className="page">{searchResult.page + 1} / {searchResult.nbPages}</div>

						<div className="next">
							<Button
								disabled={searchResult.page + 1 === searchResult.nbPages}
								onClick={() => searchHackerNews(searchParamsQuery, searchResult.page + 1)}
								variant="primary"
							>Next Page</Button>
						</div>
					</div>
				</div>
			)}

			{searchParamsQuery && searchResult && searchResult.hits.length === 0 && (
				<div id="search-result">
					<Alert variant="info">
						Sorry, no search results for <em>{searchParamsQuery}</em>...
					</Alert>
				</div>
			)}
		</>
	);
};

export default SearchPage;
