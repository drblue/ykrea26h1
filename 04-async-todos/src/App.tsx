import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import { fetchTodos } from "./services/TodoAPI";
import type { Todo } from "./types/Todo.types";
import "./assets/scss/App.scss";

function App() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	const handleAddTodo = (_title: string) => {
		// FIX ME: Create todo on server
	}

	const handleDeleteTodo = (_id: number) => {
		// FIX ME: Delete todo on server
	}

	const handleToggleTodo = (_id: number) => {
		// FIX ME: Toggle todo on server
	}

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await fetchTodos();
				setTodos(data);
			} catch {
				// Something bad happened
				setError("Something bad happened.");
			}

			setIsLoading(false);
		}
		getData();
	}, []);

	// Derive list of completed/incompleted todos from the `todos` state
	const finishedTodos = todos?.filter(todo => todo.completed) ?? [];
	const notFinishedTodos = todos?.filter(todo => !todo.completed) ?? [];

	return (
		<Container className="py-2">
			<h1>Simple Todos</h1>

			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{error && <Alert variant="danger">{error}</Alert>}

			{isLoading && <p>Loading todos...</p>}

			{!isLoading && todos && (
				todos.length > 0 ? (
					<>
						<h2 className="h5 mb-2">💪🏻 Stuff I got to do</h2>
						<TodoList
							onDelete={handleDeleteTodo}
							onToggle={handleToggleTodo}
							todos={notFinishedTodos}
						>
						</TodoList>

						<h2 className="h5 mb-2">🥺 Stuff I've done</h2>
						<TodoList
							onDelete={handleDeleteTodo}
							onToggle={handleToggleTodo}
							todos={finishedTodos}
						>
						</TodoList>

						<TodoCounter
							completed={finishedTodos.length}
							total={todos.length}
						/>
					</>
				) : (
					<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
				)
			)}

		</Container>
	);
}

export default App;
