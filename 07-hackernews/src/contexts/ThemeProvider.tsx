import { useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(true);

	const toggleTheme = () => {
		setIsDarkMode(prevMode => !prevMode);
	}

	return (
		<ThemeContext.Provider value={ { isDarkMode, toggleTheme } }>
			{/* ALL MY CHILDREN THAT I WILL PROVIDE VALUE TO */}
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider;
