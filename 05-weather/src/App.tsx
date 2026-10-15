import Container from "react-bootstrap/Container";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import "./assets/scss/App.scss";

function App() {
	return (
		<Container as="main" id="app">
			<header className="app-header">
				<h1>Weather</h1>
			</header>

			<SearchCity />
			<CurrentWeather />
		</Container>
	);
}

export default App;
