import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import TodoCounter from "./components/TodoCounter";
import AddTodoForm from "./components/AddTodoForm";
import type { Todo } from "./types/Todo.types";
import "./assets/scss/App.scss";
import TodoListItem from "./components/TodoListItem";

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

	return (
		<Container className="py-2">
			<h1>Simple Todos</h1>

			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{todos.length > 0 ? (
				<>
					<ListGroup className="todolist mb-3">
						{todos.map(todo => (
							<TodoListItem
								onDelete={handleDeleteTodo}
								onToggle={handleToggleTodo}
								key={todo.id}
								todo={todo}
							/>
						))}
					</ListGroup>

					<TodoCounter
						completed={todos.filter(todo => todo.completed).length}
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
