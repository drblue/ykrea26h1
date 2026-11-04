import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of ThemeProvider!");
	}

	return (
		<>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is: {themeContext.isDarkMode ? "Dark 🌙" : "Light ☀️"}</p>

			<Button
				onClick={() => themeContext.toggleTheme()}
				variant="secondary"
			>Change theme</Button>

			<Link to="/search">
				<Button>Use the Search, you must!</Button>
			</Link>
		</>
	)
}

export default HomePage;
