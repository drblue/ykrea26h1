import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<>
			<Navigation />

			<Container className="py-2">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
