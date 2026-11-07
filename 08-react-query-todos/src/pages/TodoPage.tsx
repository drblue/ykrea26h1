import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ErrorAlert from "../components/alerts/ErrorAlert";
import Loading from "../components/Loading";
import useTodo from "../hooks/useTodo";
import useTodos from "../hooks/useTodos";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo.types";

const TodoPage = () => {
	const [mutationError, setMutationError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { id } = useParams();
	const todoId = Number(id);
	const {
		data: todo,
		error,
		isError,
		isLoading,
		refetch: refetchTodo,
	} = useTodo(todoId);
	const { refetch: refetchTodos } = useTodos();

	const handleDeleteTodo = async (id: number) => {
		// Reset state
		setMutationError(null);

		try {
			// 💣 Nuke it
			await TodoAPI.deleteTodo(id);

			// 🥂 Celebrate it
			toast.success("Omg that felt good");

			// Refetch todos
			await refetchTodos();

			// 🚢 Navigate it
			navigate("/todos", {
				replace: true,  // replace the current entry in the History stack with this URL
			});

		} catch (err) {
			if (err instanceof Error) {
				setMutationError("Could not delete todo: " + err.message);
			} else {
				setMutationError("It's not me, it's you.");
			}
		}
	}

	const handleToggleTodo = async (todo: Todo) => {
		// Reset state
		setMutationError(null);

		try {
			await TodoAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});

			// Refetch the todo
			// await refetchTodo();
			// await refetchTodos();
			await Promise.all([refetchTodo(), refetchTodos()]);

		} catch (err) {
			if (err instanceof Error) {
				setMutationError("Could not toggle todo: " + err.message);
			} else {
				setMutationError("It's not me, it's you.");
			}
		}
	}

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>
	}

	if (isLoading) {
		return <Loading />;
	}

	return todo && (
		<>
			<h1>{todo.title}</h1>

			{mutationError && <ErrorAlert>{mutationError}</ErrorAlert>}

			<p><strong>Status:</strong>
			{" "}
			{todo.completed ? <span className="completed">👌🏻 Completed</span> : <span className="not-completed">🥵 Not completed</span>}</p>

			<div className="buttons mb-3">
				{/* Toggle */}
				<Button
					onClick={() => handleToggleTodo(todo)}
					variant="success"
				>Toggle</Button>

				{/* Edit */}
				<Link
					className="btn btn-warning"
					to={"/todos/" + id + "/edit"}
				>Edit</Link>

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
