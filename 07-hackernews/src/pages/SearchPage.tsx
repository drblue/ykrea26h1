import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "../components/Loading";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";

const SearchPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const [query, setQuery] = useState("");

	const searchHackerNews = async (searchQuery: string) => {
		// reset state + set loading
		setError(null);
		setIsLoading(true);
		setSearchResult(null);

		// save query
		setQuery(searchQuery);

		try {
			// call api and search for keyword
			const data = await searchByDate(searchQuery);

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
		console.log(`Would search for "${inputSearch}" in HN API`);
		await searchHackerNews(trimmedInputSearch);
	}

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

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for <em>{query}</em>...</p>

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
							<Button variant="primary">Previous Page</Button>
						</div>

						<div className="page">PAGE</div>

						<div className="next">
							<Button variant="primary">Next Page</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchPage;
