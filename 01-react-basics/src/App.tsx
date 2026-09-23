import { useState } from "react";
import "./App.css";

function App() {
	// let counter = 0;  // stateless
	const [counter, setCounter] = useState(0);

	const handleBtnClick = () => {
		console.log("Stop it, that tickles! 😂");

		console.log("Counter before increase:", counter);

		// increase counter
		setCounter(counter + 1);

		console.log("Counter after increase:", counter);
	}

	console.log("App is rendering...");

	return (
		<>
			<h1>01-react-basics</h1>

			<p>Counter: {counter}</p>

			<button onClick={handleBtnClick}>Click me!</button>
		</>
	);
}

export default App;
