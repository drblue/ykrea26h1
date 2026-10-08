import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString();
	});

	useEffect(() => {
		console.log("🔫 Starting clock...");
		setInterval(() => {
			const now = new Date().toLocaleTimeString();
			console.log("🕰️ Tick...", now);
			setTime(now);
		}, 1000);
	}, []);

	return (
		<div id="clock">
			{time}
		</div>
	)
}

export default Clock;
