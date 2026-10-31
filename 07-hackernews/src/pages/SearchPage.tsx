import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "../components/Loading";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";

const SearchPage = () => {
	const [error, _setError] = useState<string | null>(null);
	const [isLoading, _setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [_searchResult, _setSearchResult] = useState<HN_SearchResponse | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// prevent smol searches

		// search for haxx0rs 🕵
		console.log(`Would search for "${inputSearch}" in HN API`);
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

			{(
				<div id="search-result">
					<p>Showing HITS search results for QUERY...</p>

					<ListGroup className="mb-3">
						{[{}].map((_hit) => (
							<ListGroup.Item action href={"/"} key={""}>
								<h2 className="h3">TITLE</h2>
								<p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
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
