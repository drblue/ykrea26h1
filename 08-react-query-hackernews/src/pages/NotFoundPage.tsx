import { Link } from "react-router";
import notFoundImage from "../assets/images/not-found-batman.svg";

const NotFoundPage = () => {
	return (
		<main className="text-center py-4">
			<img
				src={notFoundImage}
				alt="Batman looking lost beside a 404 sign."
				className="img-fluid mb-4"
				width={640}
				height={360}
			/>

			<h1>404 — Page not found</h1>
			<p>Even Batman couldn't find this page. Let's head back to safety.</p>

			<Link to="/" className="btn btn-primary">Back to home</Link>
		</main>
	);
};

export default NotFoundPage;
