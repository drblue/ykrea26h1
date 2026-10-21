import { useState } from "react";
import Container from "react-bootstrap/Container";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import type { CurrentWeatherData } from "./services/OWMAPI.types";
import "./assets/scss/App.scss";
import LoadingWeather from "./components/LoadingWeather";

function App() {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (location: string) => {
		console.log(`Someone wants the current weather at '${location}'`);

		// Reset state
		setCurrentWeather(null);
		setIsLoading(true);

		// Call API and get current weather at `location`
		const data = await getCurrentWeather(location);

		// Update current weather state with the API-response
		setCurrentWeather(data);
		setIsLoading(false);
	}

	return (
		<Container as="main" id="app">
			<header className="app-header">
				<h1>Weather</h1>
			</header>

			<SearchCity onSearch={handleSearch} />

			{isLoading && <LoadingWeather />}

			{!isLoading && !currentWeather && (
				<div className="weather-status">
					<p>Search for a city to see the current weather.</p>
				</div>
			)}

			<div aria-live="polite" aria-busy={isLoading}>
				{currentWeather && <CurrentWeather data={currentWeather} />}
			</div>
		</Container>
	);
}

export default App;
