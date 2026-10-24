import { Link } from "react-router";

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, <Link to="/some-page-that-does-not-exist">you need a todo list</Link>.</p>
		</>
	)
}

export default HomePage;
