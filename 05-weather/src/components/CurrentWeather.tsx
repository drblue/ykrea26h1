import type { CurrentWeatherData } from "../services/OWMAPI.types";
import WeatherCondition from "./WeatherCondition";

interface CurrentWeatherProps {
	data: CurrentWeatherData;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
	return (
		<section id="current-weather" aria-labelledby="location">
			<h2 id="location">{data.name} <span className="country">{data.sys.country}</span></h2>
			<div className="weather-summary">
				<p className="temperature">{data.main.temp}&deg;<span>Celsius</span></p>
				<ul className="conditions">
					{data.weather.map(condition => (
						<WeatherCondition data={condition} key={condition.id} />
					))}
				</ul>
			</div>

			<dl className="weather-details">
				<div>
					<dt>Humidity</dt>
					<dd>{data.main.humidity} %</dd>
				</div>
				<div>
					<dt>Wind</dt>
					<dd>{data.wind.speed} m/s</dd>
				</div>
			</dl>

			<footer className="weather-footer">
				<p className="updated">
					{/* Updated <time dateTime="2026-10-15T08:30:00Z">15 Oct 2026, 10:30</time> */}
				</p>
				<span>OpenWeatherMap</span>
			</footer>
		</section>
	);
}

export default CurrentWeather;
