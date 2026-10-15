import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function SearchCity() {
	return (
		<div id="search-wrapper">
			<Form id="search-form">
				<Form.Label htmlFor="city-input">City</Form.Label>

				<InputGroup>
					<Form.Control
						id="city-input"
						type="text"
						placeholder="Enter a city"
						autoComplete="off"
					/>
					<Button type="button" variant="primary">Search</Button>
				</InputGroup>
			</Form>
		</div>
	);
}

export default SearchCity;
