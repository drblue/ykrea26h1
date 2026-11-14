import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import useTodos from "../hooks/useTodos";

function TodosPage() {
	const { data: todos, error, isError, isLoading } = useTodos();

	return (
		<>
			<h1>Todos</h1>

			{isError && <Alert variant="danger">{error.message}</Alert>}

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
