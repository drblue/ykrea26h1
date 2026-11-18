import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ErrorAlert from "../components/alerts/ErrorAlert";
import Loading from "../components/Loading";
import useTodo from "../hooks/useTodo";
import * as TodoAPI from "../services/TodoAPI";
import type { UpdateTodoPayload } from "../types/Todo.types";

const TodoPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const todoId = Number(id);
	const queryClient = useQueryClient();
	const {
		data: todo,
		error,
		isError,
		isLoading,
	} = useTodo(todoId);

	const updateTodoMutation = useMutation({
		mutationFn: (data: UpdateTodoPayload) => TodoAPI.updateTodo(todoId, data),
		onSuccess: async () => {
			// 🥂 Toast the user
			toast.success("Todo saved 🏊🏻🛟");

			// Invalidate all related queries
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ["todos"] }),
				queryClient.invalidateQueries({ queryKey: ["todo", { id: todoId }] }),
			]);

			// 🚢 Redirect the user
			navigate("/todos/" + todoId);
		},
		onError: (err) => {
			// 💣 Throw bomb at user
			toast.error("Error: " + err.message);
		},
	});

	const handleDeleteTodo = async (id: number) => {
		// TODO: Replace me with a mutation

		/*
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
		*/
	}

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>
	}

	if (isLoading) {
		return <Loading />;
	}

	return todo && (
		<>
			<title>{todo.title}</title>
			<h1>{todo.title}</h1>

			{updateTodoMutation.isError && <ErrorAlert>{updateTodoMutation.error.message}</ErrorAlert>}

			<p><strong>Status:</strong>
			{" "}
			{todo.completed ? <span className="completed">👌🏻 Completed</span> : <span className="not-completed">🥵 Not completed</span>}</p>

			<div className="buttons mb-3">
				{/* Toggle */}
				<Button
					disabled={updateTodoMutation.isPending}
					onClick={() => updateTodoMutation.mutate({ completed: !todo.completed })}
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
