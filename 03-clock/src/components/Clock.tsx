import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString();
	});

	useEffect(() => {
		console.log("🔫 Starting clock...");
		const intervalId = setInterval(() => {
			const now = new Date().toLocaleTimeString();
			console.log("🕰️ Tick...", now);
			setTime(now);
		}, 1000);

		return () => {
			// This clean-up function will be executed when
			// the component is about to be unmounted
			console.log("💣💥 Clock is being unmounted 😰 Stopping timer to prevent time paradoxes 😎");
			clearInterval(intervalId);
		}
	}, []);

	return (
		<div id="clock">
			{time}
		</div>
	)
}

export default Clock;
