import Image from "react-bootstrap/Image";
import type { CurrentWeatherCondition } from "../services/OWMAPI.types";

interface WeatherConditionProps {
	data: CurrentWeatherCondition;
}

function WeatherCondition({ data }: WeatherConditionProps) {
	return (
		<li>
			<Image
				alt={data.main}
				width={64}
				height={64}
				src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
			/>
			<span className="condition-description">{data.description}</span>
		</li>
	);
}

export default WeatherCondition;
