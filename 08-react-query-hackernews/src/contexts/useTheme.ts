import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const useTheme = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of ThemeProvider!");
	}

	return themeContext;
}

export default useTheme;
