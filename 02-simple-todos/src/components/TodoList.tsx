import ListGroup from "react-bootstrap/ListGroup";
import TodoListItem from "./TodoListItem";
import type { Todo } from "../types/Todo.types";

interface TodoListProps {
	onDelete: (id: number) => void;
	onToggle: (id: number) => void;
	todos: Todo[];
}

const TodoList = ({ onDelete, onToggle, todos }: TodoListProps) => {
	return (
		<ListGroup className="todolist mb-3">
			{todos.map(todo => (
				<TodoListItem
					onDelete={onDelete}
					onToggle={onToggle}
					key={todo.id}
					todo={todo}
				/>
			))}
		</ListGroup>
	)
}

export default TodoList;
