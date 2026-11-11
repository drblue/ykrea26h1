import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import CurrentWeather from "./components/CurrentWeather";
import LoadingWeather from "./components/LoadingWeather";
import SearchCity from "./components/SearchCity";
import useCurrentWeather from "./hooks/useCurrentWeather";
import "./assets/scss/App.scss";

function App() {
	const [selectedCity, setSelectedCity] = useState("");
	const { data, error, isError, isLoading, refetch } = useCurrentWeather(selectedCity);

	const handleSearch = (location: string) => {
		if (location === selectedCity) {
			refetch();
			return;
		}

		// Set selected city
		setSelectedCity(location);
	}

	return (
		<>
			<Container as="main" id="app">
				<header className="app-header">
					<h1>Weather</h1>
				</header>

				<SearchCity isLoading={isLoading} onSearch={handleSearch} />

				{isError && <Alert variant="danger">{error.message}</Alert>}

				{isLoading && <LoadingWeather />}

				{!isLoading && !data && (
					<div className="weather-status">
						<p>Search for a city to see the current weather.</p>
					</div>
				)}

				<div aria-live="polite" aria-busy={isLoading}>
					{data && <CurrentWeather data={data} />}
				</div>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default App;
