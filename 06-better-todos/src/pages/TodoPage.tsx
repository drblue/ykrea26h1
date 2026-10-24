import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useParams } from "react-router";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo.types";
import Loading from "../components/Loading";

const TodoPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const { id } = useParams();
	const todoId = Number(id);

	// Get todo from API
	const getTodo = async (id: number) => {
		// Check if todoId actually is a number
		if (isNaN(id)) {
			setError("Todo ID is not a number");
			return;
		}

		// Reset state
		setError(null);
		setIsLoading(true);
		setTodo(null);

		// Make request to API (or try to...)
		try {
			const data = await TodoAPI.getTodo(id);
			setTodo(data);

		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("It's not me, it's you");
			}

		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		// oxlint-disable-next-line react/set-state-in-effect
		getTodo(todoId);
	}, [todoId]);

	if (error) {
		return <Alert variant="warning">{error}</Alert>
	}

	if (isLoading) {
		return <Loading />;
	}

	return todo && (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? "Completed" : "Not completed"}</p>

			<div className="buttons mb-3">
				{/* Toggle */}

				{/* Delete */}
			</div>

			{/* Back to all todos */}
		</>
	)
}

export default TodoPage;
