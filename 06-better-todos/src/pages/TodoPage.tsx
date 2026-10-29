import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo.types";
import { toast } from "react-toastify";

const TodoPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const navigate = useNavigate();
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

	const handleDeleteTodo = async (id: number) => {
		// Reset state
		setError(null);

		try {
			// 💣 Nuke it
			await TodoAPI.deleteTodo(id);

			// 🥂 Celebrate it
			toast.success("Omg that felt good");

			// 🚢 Navigate it
			navigate("/todos", {
				replace: true,  // replace the current entry in the History stack with this URL
			});

		} catch (err) {
			if (err instanceof Error) {
				setError("Could not delete todo: " + err.message);
			} else {
				setError("It's not me, it's you.");
			}
		}
	}

	const handleToggleTodo = async (todo: Todo) => {
		// Reset state
		setError(null);

		try {
			const data = await TodoAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			setTodo(data);

		} catch (err) {
			if (err instanceof Error) {
				setError("Could not toggle todo: " + err.message);
			} else {
				setError("It's not me, it's you.");
			}
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

			<p><strong>Status:</strong>
			{" "}
			{todo.completed ? <span className="completed">👌🏻 Completed</span> : <span className="not-completed">🥵 Not completed</span>}</p>

			<div className="buttons mb-3">
				{/* Toggle */}
				<Button
					onClick={() => handleToggleTodo(todo)}
					variant="success"
				>Toggle</Button>

				{/* Delete */}
				<Button
					onClick={() => handleDeleteTodo(todo.id)}
					variant="danger"
				>Delete</Button>
			</div>

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
