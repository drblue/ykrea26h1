import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useSearchParams } from "react-router";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import useHackerNewsSearch from "../hooks/useHackerNewsSearch";

const SearchPage = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query=` value from URL
	const query = searchParams.get("query") ?? ""; // /search?query=tesla

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

	// get `sort` value from URL
	const sort = searchParams.get("sort") === "relevance" ? "relevance" : "latest";

	const { data: searchResult, error, isError, isLoading } =
		useHackerNewsSearch(query, page, hitsPerPage, sort);

	const handleReset = () => {
		setInputSearch("");
		setSearchParams({ hitsPerPage: String(hitsPerPage), sort });
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
		setSearchParams({ query: trimmedInputSearch, page: String(1), hitsPerPage: String(hitsPerPage), sort });
	}

	useEffect(() => {
		// oxlint-disable-next-line react/set-state-in-effect
		setInputSearch(query)
	}, [query]);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onReset={handleReset} onSubmit={handleSubmit}>
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

				<Row className="mb-3">
					<Form.Group as={Col} controlId="sort">
						<Form.Label>Sort by</Form.Label>
						<Form.Select
							onChange={e => setSearchParams(prevParams => {
								const nextParams = new URLSearchParams(prevParams);
								nextParams.set("sort", e.target.value);
								nextParams.set("page", "1");
								return nextParams;
							})}
							value={sort}
						>
							<option value="latest">Latest</option>
							<option value="relevance">Relevance</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId="hitsPerPage">
						<Form.Label>Results per page</Form.Label>
						<Form.Select
							onChange={e => setSearchParams(prevParams => {
								const nextParams = new URLSearchParams(prevParams);
								nextParams.set("hitsPerPage", e.target.value);
								nextParams.set("page", "1");
								return nextParams;
							})}
							value={String(hitsPerPage)}
						>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
						</Form.Select>
					</Form.Group>
				</Row>

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
			</Form>

			{isError && <Alert variant="warning">{error.message}</Alert>}

			{isLoading && <Loading />}

			{searchResult && searchResult.hits.length > 0 && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for <em>{query}</em>...</p>

					<Pagination
						className="mb-3"
						page={page}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 1}
						hasNextPage={page < searchResult.nbPages}
						onPreviousPage={() =>
							setSearchParams({ query: query, page: String(page - 1), hitsPerPage: String(hitsPerPage), sort })
						}
						onNextPage={() =>
							setSearchParams({ query: query, page: String(page + 1), hitsPerPage: String(hitsPerPage), sort })
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
							setSearchParams({ query: query, page: String(page - 1), hitsPerPage: String(hitsPerPage), sort })
						}
						onNextPage={() =>
							setSearchParams({ query: query, page: String(page + 1), hitsPerPage: String(hitsPerPage), sort })
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

			{query && searchResult && searchResult.hits.length === 0 && (
				<div id="search-result">
					<Alert variant="info">
						Sorry, no search results for <em>{query}</em>...
					</Alert>
				</div>
			)}
		</>
	);
};

export default SearchPage;
