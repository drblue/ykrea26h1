import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import AddTodoForm from "../components/AddTodoForm";
import TodoCounter from "../components/TodoCounter";
import { createTodo, getTodos } from "../services/TodoAPI";
import type { Todo } from "../types/Todo.types";

function TodosPage() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	const getData = async () => {
		// Set loading state
		setIsLoading(true);

		try {
			const data = await getTodos();
			setTodos(data);
		} catch {
			// Something bad happened
			setError("Something bad happened.");
		}

		setIsLoading(false);
	}

	const handleAddTodo = async (title: string) => {
		try {
			const createdTodo = await createTodo({
				title,
				completed: false,
			});

			setTodos(prevTodos => [...prevTodos ?? [], createdTodo]);
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

	/*
	const handleDeleteTodo = async (id: number) => {
		try {
			await deleteTodo(id);

			setTodos(prevTodos => (prevTodos ?? []).filter(t => t.id !== id));
		} catch (err) {
			if (err instanceof Error) {
				setError("Could not delete todo: " + err.message);
			} else {
				setError("It's not me, it's you.");
			}
		}
	}

	const handleToggleTodo = async (todo: Todo) => {
		try {
			await updateTodo(todo.id, {
				completed: !todo.completed,
			});

			setTodos(prevTodos =>
				(prevTodos ?? []).map(t =>
					t.id === todo.id
						? { ...t, completed: !todo.completed }
						: t
			));

		} catch (err) {
			if (err instanceof Error) {
				setError("Could not toggle todo: " + err.message);
			} else {
				setError("It's not me, it's you.");
			}
		}
	}
	*/

	useEffect(() => {
		(async () => {
			await getData();
		})();
	}, []);

	return (
		<>
			<h1>Todos</h1>

			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{error && <Alert variant="danger">{error}</Alert>}

			{isLoading && <p>Loading todos...</p>}

			{!isLoading && todos && (
				todos.length > 0 ? (
					<>
						<ListGroup className="todolist mb-3">
							{todos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									className={todo.completed ? "completed" : ""}
									key={todo.id}
									to={"/todos/" + todo.id}
								>
									<span className="todo-title">{todo.title}</span>
								</ListGroup.Item>
							))}
						</ListGroup>

						<TodoCounter
							completed={todos.filter(todo => todo.completed).length}
							total={todos.length}
						/>
					</>
				) : (
					<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
				)
			)}

		</>
	);
}

export default TodosPage;
