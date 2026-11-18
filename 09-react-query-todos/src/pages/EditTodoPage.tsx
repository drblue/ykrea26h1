import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import TodoForm from "../components/TodoForm";
import useTodo from "../hooks/useTodo";

const EditTodoPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const todoId = Number(id);

	const { data: todo, error, isError, isLoading } = useTodo(todoId);

	const handleUpdateTodo = async (title: string) => {
		/*
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
			<title>{`Edit: ${todo.title}`}</title>
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
