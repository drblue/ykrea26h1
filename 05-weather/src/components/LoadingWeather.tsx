import Image from "react-bootstrap/Image";
import imgLoading from "../assets/images/loading.svg";

function LoadingWeather() {
	return (
		<div className="weather-status" role="status">
			<Image src={imgLoading} className="weather-man" alt="Man holding umbrella" fluid />
			<p>Fetching the latest weather…</p>
		</div>
	);
}

export default LoadingWeather;
