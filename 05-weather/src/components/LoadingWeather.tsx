import Spinner from "react-bootstrap/Spinner";

function LoadingWeather() {
	return (
		<div className="weather-status" role="status">
			<Spinner animation="border" className="weather-spinner" aria-hidden="true" />
			<p>Fetching the latest weather…</p>
		</div>
	);
}

export default LoadingWeather;
