import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "../types/Todo.types";

interface TodoListItemProps {
	todo: Todo;
}

const TodoListItem = ({ todo }: TodoListItemProps) => {
	return (
		<ListGroup.Item
			className={todo.completed ? "completed" : ""}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<Button
					// onClick={() => handleToggleTodo(todo.id)}
					size="sm"  // btn-sm
					variant="outline-warning"
				>Toggle</Button>

				<Button
					// onClick={() => handleDeleteTodo(todo.id)}
					size="sm"  // btn-sm
					variant="outline-danger"
				>Delete</Button>
			</div>
		</ListGroup.Item>
	)
}

export default TodoListItem;
