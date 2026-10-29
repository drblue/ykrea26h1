import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/partials/Navigation";
import CreateTodoPage from "./pages/CreateTodoPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";
import TodoPage from "./pages/TodoPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<>
			<Navigation />

			<Container className="py-2">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/create" element={<CreateTodoPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ToastContainer
				autoClose={3000}
				closeOnClick={true}
				limit={5}
				newestOnTop={true}
				position="top-right"
				// stacked={true}
				theme="colored"
			/>
		</>
	);
}

export default App;
