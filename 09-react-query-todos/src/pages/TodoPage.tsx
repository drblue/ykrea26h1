import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
	const [queryEnabled, setQueryEnabled] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();
	const todoId = Number(id);
	const queryClient = useQueryClient();
	const {
		data: todo,
		error,
		isError,
		isLoading,
	} = useTodo(todoId, queryEnabled);

	const deleteTodoMutation = useMutation({
		mutationFn: () => TodoAPI.deleteTodo(todoId),
		onMutate: () => {
			// disable query for this specific todo (to avoid it being fetched again)
			setQueryEnabled(false);
		},
		onError: () => {
			// re-enable query
			setQueryEnabled(true);
		},
		onSuccess: async () => {
			// 🥂 Celebrate it
			toast.success("Omg that felt good");

			// Invalidate the `todos` query
			await queryClient.invalidateQueries({ queryKey: ["todos"] });

			// Remove the cached query for this todo
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] });

			// 🚢 Navigate it
			navigate("/todos", {
				replace: true,  // replace the current entry in the History stack with this URL
			});
		},
	});

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

			{deleteTodoMutation.isError && <ErrorAlert>{deleteTodoMutation.error.message}</ErrorAlert>}
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
					disabled={deleteTodoMutation.isPending}
					onClick={() => deleteTodoMutation.mutate()}
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
