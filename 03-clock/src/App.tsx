import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ClassClock from "./components/ClassClock";
import "./assets/scss/App.scss";

function App() {
	const [showClock, setShowClock] = useState(false);

	return (
		<Container className="center-xy">
			<Button onClick={() => setShowClock(!showClock)}>
				{showClock ? "🕵 clock" : "👀 clock"}
			</Button>

			{showClock && <ClassClock />}
		</Container>
	);
}

export default App;
