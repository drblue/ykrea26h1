import { Component } from "react";

class ClassClock extends Component {
	state = { time: new Date().toLocaleTimeString() }
	private timer: number | undefined;

	componentDidMount() {
		this.timer = setInterval(() => {
			const now = new Date().toLocaleTimeString();
			console.log("🕰️ Tick...", now);
			this.setState({ time: now });
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return <div id="clock">
			{this.state.time}
		</div>
	}
}

export default ClassClock;
