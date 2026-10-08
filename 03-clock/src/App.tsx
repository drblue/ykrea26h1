import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Clock from "./components/Clock";
import "./assets/scss/App.scss";

function App() {
	const [showClock, setShowClock] = useState(false);

	return (
		<Container className="center-xy">
			<Button onClick={() => setShowClock(!showClock)}>
				{showClock ? "🕵 clock" : "👀 clock"}
			</Button>

			{showClock && <Clock />}
		</Container>
	);
}

export default App;
