import { useState } from "react";
import Counter from "./components/Counter";
import PostCounter from "./components/PostCounter";
import "./assets/scss/App.scss";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	// let counter = 0;  // stateless
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state? 🚓", likes: 3 },
	]);
	const [salary, setSalary] = useState(10);

	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
			setSalary(5);
			return;
		}

		// Or just use Math.max(5, salary + amount) below
		setSalary(salary + amount);
	}

	const handleAddLike = (id: number) => {
		console.log(`Post ${id} deserves more <3!`);

		/*
		setPosts((prevPosts) => {
			return prevPosts.map(post => {
				return post.id === id
					? { ...post, likes: post.likes + 1 }
					: post;
			})
		});
		*/
		setPosts((prevPosts) =>
			prevPosts.map(post =>
				post.id === id
					? { ...post, likes: post.likes + 1 }
					: post
			)
		);
	}

	const handleAddPost = () => {
		const title = prompt("What do you want to tell the world?");
		if (!title) {
			alert("mkai...");
			return;
		}

		const newPost: Post = {
			id: Math.max(0, ...posts.map(post => post.id)) + 1,
			title,
			likes: 0,
		}

		setPosts((prevPosts) => [...prevPosts, newPost]);
	}

	const handleDelete = (id: number) => {
		setPosts((prevPosts) =>
			prevPosts.filter(post => post.id !== id)
		);
	}

	console.log("App is rendering...");

	return (
		<div className="container py-2">
			<h1>01-react-basics</h1>

			<Counter />

			<Counter />

			<hr />

			<p>{msg}</p>

			<button className="btn btn-primary" onClick={() => setMsg("Hi dad!")}>Hi dad?</button>

			<hr />

			<h2>Salary</h2>

			<p>Salary per hour: {salary} &euro;</p>

			{salary < 10 && (
				<div className="alert alert-warning">
					You might want to change job?
				</div>
			)}

			<div className="buttons">
				<div className="mb-1">
					<button
						className="btn btn-primary btn-lg"
						onClick={() => handleChangeSalary(1)}
					>
						Raise 1 &euro; 🤑
					</button>
					<button
						disabled={salary === 5}
						className="btn btn-warning btn-lg"
						onClick={() => handleChangeSalary(-1)}
					>
						Decrease 1 &euro; 😢
					</button>
				</div>

				<div className="mb-1">
					<button
						className="btn btn-primary btn-lg"
						onClick={() => handleChangeSalary(5)}
					>
						Raise 5 &euro; 🤑🤑🤑
					</button>
					<button
						disabled={salary - 5 < 5}
						className="btn btn-warning btn-lg"
						onClick={() => handleChangeSalary(-5)}
					>
						Decrease 5 &euro; 😢😢😢
					</button>
				</div>
			</div>

			<hr />

			<h2>Posts</h2>

			<button
				className="btn btn-primary mb-3"
				onClick={handleAddPost}
			>Add post</button>

			{posts.length > 0 && (
				<ul className="postlist">
					{posts.map(post =>
						<li key={post.id}>
							{post.title} ({post.likes} likes)

							<button
								className="ms-1 btn btn-sm btn-success"
								onClick={() => handleAddLike(post.id)}
							>❤️</button>

							<button
								className="ms-1 btn btn-sm btn-danger"
								onClick={() => handleDelete(post.id)}
							>💣</button>
						</li>
					)}
				</ul>
			)}

			<PostCounter count={posts.length} />
		</div>
	);
}

export default App;
