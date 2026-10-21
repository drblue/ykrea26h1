import Container from "react-bootstrap/Container";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import "./assets/scss/App.scss";

function App() {
	const handleSearch = async (location: string) => {
		console.log(`Someone wants the current weather at '${location}'`);
	}

	return (
		<Container as="main" id="app">
			<header className="app-header">
				<h1>Weather</h1>
			</header>

			<SearchCity onSearch={handleSearch} />
			<CurrentWeather />
		</Container>
	);
}

export default App;
