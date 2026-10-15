import Image from "react-bootstrap/Image";

function WeatherCondition() {
	return (
		<li>
			<Image
				alt=""
				width={64}
				height={64}
				src="https://openweathermap.org/img/wn/04d@2x.png"
			/>
			<span className="condition-description">dark & foggy, lots of villains</span>
		</li>
	);
}

export default WeatherCondition;
