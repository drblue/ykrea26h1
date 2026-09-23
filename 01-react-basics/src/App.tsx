import "./App.css";

function App() {
	let counter = 0;

	const handleBtnClick = () => {
		console.log("Stop it, that tickles! 😂");

		console.log("Counter before increase:", counter);

		// increase counter
		counter++;

		console.log("Counter after increase:", counter);
	}

	return (
		<>
			<h1>01-react-basics</h1>

			<p>Counter: {counter}</p>

			<button onClick={handleBtnClick}>Click me!</button>
		</>
	);
}

export default App;
