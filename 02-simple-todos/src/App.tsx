import { useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
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

	return (
		<Container className="py-2">
			<h1>Simple Todos</h1>

			<ListGroup className="todolist mb-3">
				{todos.map(todo => (
					<ListGroup.Item
						className={todo.completed ? "completed" : ""}
						key={todo.id}
					>
						<span className="todo-title">{todo.title}</span>
					</ListGroup.Item>
				))}
			</ListGroup>

			<p>{todos.filter(todo => todo.completed).length} av {todos.length} avklarade.</p>
		</Container>
	);
}

export default App;
