import { useState } from "react";
import Container from "react-bootstrap/Container";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/Todo.types";
import "./assets/scss/App.scss";

const initialTodos: Todo[] = [
	{ id: 1, title: "Make coffee", completed: true },
	{ id: 2, title: "Drink coffee", completed: false },
	{ id: 3, title: "Drink MOAR coffee", completed: false },
	{ id: 4, title: "Drink ALL ZE coffee", completed: false },
];

function App() {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

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
