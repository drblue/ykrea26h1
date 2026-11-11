/**
 * Types for Open Weather Map API
 *
 * <https://openweathermap.org/current>
 */

export interface CurrentWeatherCondition {
	description: string;
	icon: string;
	id: number;
	main: string;
}

export interface CurrentWeatherData {
	name: string;
	dt: number;
	main: {
		feels_like: number;
		humidity: number;
		temp: number;
	};
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	weather: CurrentWeatherCondition[];
	wind: {
		speed: number;
	};
}
