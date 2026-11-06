interface TodoCounterProps {
	completed: number;
	total: number;
}

const TodoCounter = ({ completed, total }: TodoCounterProps) => {
	return (
		<p>{completed} of {total} {total === 1 ? "todo" : "todos"} completed.</p>
	)
}

export default TodoCounter;
