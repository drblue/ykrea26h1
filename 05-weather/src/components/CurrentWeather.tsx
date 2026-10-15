import WeatherCondition from "./WeatherCondition";

function CurrentWeather() {
	return (
		<section id="current-weather" aria-labelledby="location">
			<h2 id="location">Gotham City <span className="country">US</span></h2>
			<div className="weather-summary">
				<p className="temperature">13.37&deg;<span>Celsius</span></p>
				<ul className="conditions">
					<WeatherCondition />
				</ul>
			</div>

			<dl className="weather-details">
				<div>
					<dt>Humidity</dt>
					<dd>42 %</dd>
				</div>
				<div>
					<dt>Wind</dt>
					<dd>6.9 m/s</dd>
				</div>
			</dl>

			<footer className="weather-footer">
				<p className="updated">
					Updated <time dateTime="2026-10-15T08:30:00Z">15 Oct 2026, 10:30</time>
				</p>
				<span>OpenWeatherMap</span>
			</footer>
		</section>
	);
}

export default CurrentWeather;
