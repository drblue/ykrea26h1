import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "../types/Todo.types";

interface TodoListItemProps {
	onDelete: (id: number) => void;
	onToggle: (id: number) => void;
	todo: Todo;
}

const TodoListItem = ({ onDelete, onToggle, todo }: TodoListItemProps) => {
	return (
		<ListGroup.Item
			className={todo.completed ? "completed" : ""}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<Button
					onClick={() => onToggle(todo.id)}
					size="sm"  // btn-sm
					variant="outline-warning"
				>Toggle</Button>

				<Button
					onClick={() => onDelete(todo.id)}
					size="sm"  // btn-sm
					variant="outline-danger"
				>Delete</Button>
			</div>
		</ListGroup.Item>
	)
}

export default TodoListItem;
