import { useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// This will only be executed on the FIRST render when no state exist.
		// The return value will be used as the initial value for the state.
		console.log("Getting initial state for `isDarkMode` from localStorage `hn_darkmode`...");
		const localStorage_hn_darkmode = localStorage.getItem("hn_darkmode") ?? "true";

		return localStorage_hn_darkmode === "true";
	});

	const toggleTheme = () => {
		// set new state
		setIsDarkMode(prevMode => !prevMode);

		// save new value to localStorage
		// N.B.! `isDarkMode` hasn't changed yet as React batches state updates
		localStorage.setItem("hn_darkmode", String(!isDarkMode));
	}

	return (
		<ThemeContext.Provider value={ { isDarkMode, toggleTheme } }>
			{/* ALL MY CHILDREN THAT I WILL PROVIDE VALUE TO */}
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider;
