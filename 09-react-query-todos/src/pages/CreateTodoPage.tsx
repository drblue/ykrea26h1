import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router";
import TodoForm from "../components/TodoForm";
import { createTodo } from "../services/TodoAPI";
import type { CreateTodoPayload } from "../types/Todo.types";

const CreateTodoPage = () => {
	const queryClient = useQueryClient();

	const createTodoMutation = useMutation({
		mutationFn: (data: CreateTodoPayload) => createTodo(data),
		onSuccess: () => {
			// invalidate any `["todos"]` queries that exists in the cache
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const handleAddTodo = (title: string) => {
		// Call mutation 🐢☢️
		return createTodoMutation.mutateAsync({
			title,
			completed: false,
		});
	}

	return (
		<>
			<h1>Create a new Todo</h1>

			{createTodoMutation.isError && (
				<Alert variant="danger">
					{createTodoMutation.error.message ?? "Unknown error."}
				</Alert>
			)}

			<TodoForm
				onSave={handleAddTodo}
			/>

			{createTodoMutation.isSuccess && (
				<Alert variant="success">
					<Alert.Heading>Great success! ✨</Alert.Heading>

					<p>Todo was successfully created.</p>

					<Link to={"/todos/" + createTodoMutation.data.id}>Onwards to the todo &raquo;</Link>
				</Alert>
			)}

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default CreateTodoPage;
