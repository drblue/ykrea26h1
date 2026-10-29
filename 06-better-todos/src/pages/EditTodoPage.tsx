import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import TodoForm from "../components/TodoForm";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo.types";

const EditTodoPage = () => {
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

	const handleUpdateTodo = async (title: string) => {
		try {
			// 📞 Call the API and update the todo
			const data = await TodoAPI.updateTodo(todoId, { title });
			console.log("Saved? 🏊🏻🛟", data);

			// 🥂 Toast the user
			toast.success("Todo saved 🏊🏻🛟");

			// 🚢 Redirect the user
			navigate("/todos/" + todoId);

		} catch (err) {
			if (err instanceof Error) {
				setError("Could not save todo: " + err.message);
			} else {
				setError("Ouch. Stop throwing things that aren't Errors at me.");
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
			<h1>Edit: {todo.title}</h1>

			<TodoForm
				initialTitle={todo.title}
				onSave={handleUpdateTodo}
			/>

			{/* Back to previous page */}
			<Button
				onClick={() => navigate(-1)}
				variant="secondary"
			>
				&laquo; Back to safety
			</Button>
		</>
	)
}

export default EditTodoPage;
