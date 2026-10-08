import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./assets/scss/App.scss";

function App() {
	const [time, setTime] = useState("00:00:00");

	useEffect(() => {
		console.log("🔫 Starting clock...");
		setInterval(() => {
			const now = new Date().toLocaleTimeString();
			console.log("🕰️ Tick...", now);
			setTime(now);
		}, 1000);
	}, []);

	return (
		<Container className="center-xy">
			<div id="clock">
				{time}
			</div>
		</Container>
	);
}

export default App;
