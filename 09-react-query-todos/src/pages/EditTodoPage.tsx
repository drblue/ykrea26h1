import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import TodoForm from "../components/TodoForm";
import useTodo from "../hooks/useTodo";
import * as TodoAPI from "../services/TodoAPI";
import type { UpdateTodoPayload } from "../types/Todo.types";

const EditTodoPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const queryClient = useQueryClient();
	const todoId = Number(id);

	const { data: todo, error, isError, isLoading } = useTodo(todoId);

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

	const handleUpdateTodo = async (title: string) => {
		return updateTodoMutation.mutateAsync({ title });
	}

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>
	}

	if (isLoading) {
		return <Loading />;
	}

	return todo && (
		<>
			<title>{`Edit: ${todo.title}`}</title>
			<h1>Edit: {todo.title}</h1>

			{updateTodoMutation.isError && (
				<Alert variant="danger">
					{updateTodoMutation.error.message ?? "Unknown error."}
				</Alert>
			)}

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
