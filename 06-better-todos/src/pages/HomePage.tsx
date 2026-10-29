import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router";
import { toast } from "react-toastify";

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, <Link to="/some-page-that-does-not-exist">you need a todo list</Link>.</p>

			<ButtonGroup>
				<Button variant="primary" onClick={() => toast("Wow, such success, very great, much money 💰🤩")}>Celebrate 🎉</Button>

				<Button variant="success" onClick={() => toast.success("Wow, such success, very influencer, much money! 💰", { icon: () => "🚀" })}>Click me 🤑</Button>

				<Button variant="warning" onClick={() => toast.warn("Wow, such WARNING, very ALERT!", { icon: () => "🚔" })}>Call da police 👮🏻</Button>

				<Button variant="danger" onClick={() => toast.error("Wow, such ERROR, very DANGEROUS!")}>Blow shit up 💣</Button>

				<Button variant="info" onClick={() => toast.info("LIKE && SUBSCRIBE")}>Fire that ship 🔥</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
