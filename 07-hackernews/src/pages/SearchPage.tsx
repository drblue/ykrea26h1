import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router";
import Loading from "../components/Loading";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";
import Pagination from "../components/Pagination";

const SearchPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query=` value from URL
	const searchParamsQuery = searchParams.get("query"); // /search?query=tesla
	console.log("searchParamsQuery:", searchParamsQuery);

	// get `page=` value from URL
	const searchParamsPage = Number(searchParams.get("page") ?? 1);  // page=2
	const page = Number.isInteger(searchParamsPage) && searchParamsPage >= 1
		? searchParamsPage
		: 1;

	// get `hitsPerPage=` value from URL
	const searchParamsHitsPerPage = Number(searchParams.get("hitsPerPage") ?? 20);
	const hitsPerPage = [10, 20, 50].includes(searchParamsHitsPerPage)
		? searchParamsHitsPerPage
		: 20;

	console.log("hitsPerPage:", hitsPerPage);

	const searchHackerNews = async (searchQuery: string, searchPage: number, hitsPerPage: number) => {
		// reset state + set loading
		setError(null);
		setIsLoading(true);
		setSearchResult(null);

		try {
			// call api and search for keyword
			const data = await searchByDate(searchQuery, searchPage - 1, hitsPerPage);

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

	const handleReset = () => {
		setError(null);
		setInputSearch("");
		setSearchResult(null);
		setSearchParams({ hitsPerPage: String(hitsPerPage) });
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
		setSearchParams({ query: trimmedInputSearch, page: String(1), hitsPerPage: String(hitsPerPage) });
	}

	useEffect(() => {
		if (!searchParamsQuery) {
			return;
		}

		// oxlint-disable-next-line react/set-state-in-effect
		searchHackerNews(searchParamsQuery, page, hitsPerPage);
	}, [searchParamsQuery, page, hitsPerPage]);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onReset={handleReset} onSubmit={handleSubmit}>
				<Form.Group className="mb-2" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						type="text"
						value={inputSearch}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end gap-2">
					<Button
						type="reset"
						variant="secondary"
					>
						Clear
					</Button>
					<Button
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>

				<Form.Group className="mb-4" controlId="hitsPerPage">
					<Form.Label>Results per page</Form.Label>
					<Form.Select
						onChange={e => setSearchParams(prevParams => {
							const nextParams = new URLSearchParams(prevParams);
							nextParams.set("hitsPerPage", e.target.value);
							return nextParams;
						})}
						value={String(hitsPerPage)}
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</Form.Select>
				</Form.Group>
			</Form>

			{error && <Alert variant="warning">{error}</Alert>}

			{isLoading && <Loading />}

			{searchParamsQuery && searchResult && searchResult.hits.length > 0 && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for <em>{searchParamsQuery}</em>...</p>

					<Pagination
						className="mb-3"
						page={page}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 1}
						hasNextPage={page < searchResult.nbPages}
						onPreviousPage={() =>
							setSearchParams({ query: searchParamsQuery, page: String(page - 1), hitsPerPage: String(hitsPerPage)})
						}
						onNextPage={() =>
							setSearchParams({ query: searchParamsQuery, page: String(page + 1), hitsPerPage: String(hitsPerPage) })
						}
					/>

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

					<Pagination
						page={page}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 1}
						hasNextPage={page < searchResult.nbPages}
						onPreviousPage={() =>
							setSearchParams({ query: searchParamsQuery, page: String(page - 1), hitsPerPage: String(hitsPerPage)})
						}
						onNextPage={() =>
							setSearchParams({ query: searchParamsQuery, page: String(page + 1), hitsPerPage: String(hitsPerPage) })
						}
					/>

					{/*
					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								disabled={page === 1}
								onClick={() => setSearchParams({ query: searchParamsQuery, page: String(page - 1) })}
								variant="primary"
							>Previous Page</Button>
						</div>

						<div className="page">{page} / {searchResult.nbPages}</div>

						<div className="next">
							<Button
								disabled={page === searchResult.nbPages}
								onClick={() => setSearchParams({ query: searchParamsQuery, page: String(page + 1) })}
								variant="primary"
							>Next Page</Button>
						</div>
					</div>
					*/}
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
