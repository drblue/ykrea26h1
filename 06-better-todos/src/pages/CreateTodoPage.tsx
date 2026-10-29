import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router";
import AddTodoForm from "../components/AddTodoForm";
import { createTodo } from "../services/TodoAPI";
import type { Todo } from "../types/Todo.types";

const CreateTodoPage = () => {
	const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleAddTodo = async (title: string) => {
		// Reset state
		setCreatedTodo(null);
		setError(null);

		try {
			const data = await createTodo({
				title,
				completed: false,
			});

			setCreatedTodo(data);
			console.log("Created todo, yayy!!!", createdTodo);

		} catch (err) {
			if (err instanceof Error) {
				setError("Could not create todo: " + err.message);
			} else {
				setError("Ouch. Stop throwing things that aren't Errors at me.");
			}
			// Re-throw error
			throw err;
		}
	}

	return (
		<>
			<h1>Create a new Todo</h1>

			{error !== null && <Alert variant="danger">{error ?? "Unknown error."}</Alert>}

			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default CreateTodoPage;
