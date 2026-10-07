import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
	const [inputTitle, setInputTitle] = useState("");
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

	const handleAddTodo = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Create a new todo and set a new list of todos containing
		// the previous todos + new the todo
		const newTodo: Todo = {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputTitle,
			completed: false,
		}
		setTodos(prevTodos => [...prevTodos, newTodo]);

		// Clear input field
		setInputTitle("");
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

			<Form onSubmit={handleAddTodo}>
				<InputGroup className="mb-3">
					<Form.Control
						aria-label="New todo title"
						onChange={e => setInputTitle(e.target.value)}
						placeholder="Learn about GTD"
						value={inputTitle}
						required
					/>

					<Button
						type="submit"
						variant="success"
					>Create 👶🏻</Button>
				</InputGroup>
			</Form>

			{todos.length > 0 ? (
				<>
					<ListGroup className="todolist mb-3">
						{todos.map(todo => (
							<ListGroup.Item
								className={todo.completed ? "completed" : ""}
								key={todo.id}
							>
								<span className="todo-title">{todo.title}</span>

								<div>
									<Button
										onClick={() => handleToggleTodo(todo.id)}
										size="sm"  // btn-sm
										variant="outline-warning"
									>Toggle</Button>

									<Button
										onClick={() => handleDeleteTodo(todo.id)}
										size="sm"  // btn-sm
										variant="outline-danger"
									>Delete</Button>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>

					<p>{todos.filter(todo => todo.completed).length} av {todos.length} avklarade.</p>
				</>
			) : (
				<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
			)}

		</Container>
	);
}

export default App;
