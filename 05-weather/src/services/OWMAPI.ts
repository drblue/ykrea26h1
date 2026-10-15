/**
 * Open Weather Map API
 *
 * <https://openweathermap.org/current>
 */
import axios from "axios";

const API_KEY = import.meta.env.VITE_OWM_APIKEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const FAKE_SLOW_API = true;
const FAKE_SLOW_API_DELAY = 2000;

/**
 * Get current weather conditions for a city
 *
 * <https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_key}>
 *
 * @param city City name
 * @returns Current weather conditions
 */
export const getCurrentWeather = async (city: string) => {
	// Query API for current weather conditions in `city`

	// Fake slow API
	if (FAKE_SLOW_API) {
		await new Promise((r) => setTimeout(r, FAKE_SLOW_API_DELAY));
	}

	// Return current weather conditions
}
