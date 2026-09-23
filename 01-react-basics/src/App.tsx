import { useState } from "react";
import "./assets/scss/App.scss";

interface Todo {
	id: number;
	title: string;
	likes: number;
}

function App() {
	// let counter = 0;  // stateless
	const [counter, setCounter] = useState(0);
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Todo[]>([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state? 🚓", likes: 3 },
	]);

	const handleBtnClick = () => {
		console.log("Stop it, that tickles! 😂");

		console.log("Counter before increase:", counter);

		// increase counter
		setCounter(counter + 1);

		console.log("Counter after increase:", counter);
	}

	console.log("App is rendering...");

	return (
		<div className="container py-2">
			<h1>01-react-basics</h1>

			<p>Counter: {counter}</p>

			<button className="btn btn-primary" onClick={handleBtnClick}>Click me!</button>

			<hr />

			<p>{msg}</p>

			<button className="btn btn-primary" onClick={() => setMsg("Hi dad!")}>Hi dad?</button>

			<hr />

			<h2>Posts</h2>
			<ul>
				{posts.map(post =>
					<li key={post.id}>{post.title} ({post.likes} likes)</li>
				)}
			</ul>
		</div>
	);
}

export default App;
