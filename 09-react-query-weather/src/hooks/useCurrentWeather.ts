import { useQuery } from "@tanstack/react-query"
import { getCurrentWeather } from "../services/OWMAPI";

const useCurrentWeather = (city: string) => {
	return useQuery({
		queryKey: ["current-weather", city],
		queryFn: () => getCurrentWeather(city),
	});
}

export default useCurrentWeather;
