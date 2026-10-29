import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import { getTodos } from "../services/TodoAPI";
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

	useEffect(() => {
		(async () => {
			await getData();
		})();
	}, []);

	return (
		<>
			<h1>Todos</h1>

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
