import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/Todo.types";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAddTodo = (title: string) => {
		// Create a new todo and set a new list of todos containing
		// the previous todos + new the todo
		const newTodo: Todo = {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title,
			completed: false,
		}
		setTodos(prevTodos => [...prevTodos, newTodo]);
	}

	const handleDeleteTodo = (id: number) => {
		setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
	}

	const handleToggleTodo = (id: number) => {
		setTodos(prevTodos => prevTodos.map(todo =>
			(todo.id === id)
				? { ...todo, completed: !todo.completed }
				: todo
			)
		);
	}

	useEffect(() => {
		const getData = async () => {
			// Make request to API
			const res = await fetch("http://localhost:3000/todos");
			if (!res.ok) {
				throw new Error("Response was not OK!");
			}

			const data = await res.json() as Todo[];
			setTodos(data);
		}
		getData();
	}, []);

	// Derive list of completed/incompleted todos from the `todos` state
	const finishedTodos = todos.filter(todo => todo.completed);
	const notFinishedTodos = todos.filter(todo => !todo.completed);

	return (
		<Container className="py-2">
			<h1>Simple Todos</h1>

			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{todos.length > 0 ? (
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
			)}

		</Container>
	);
}

export default App;
