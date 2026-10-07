import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface AddTodoFormProps {
	onAddTodo: (title: string) => void;
}

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
	const [inputTitle, setInputTitle] = useState("");

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// 🙋 Tell parent that someone wants to create a new todo with the title
		onAddTodo(inputTitle.trim());

		// Clear input field
		setInputTitle("");
	}

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className="mb-3">
				<Form.Control
					aria-label="New todo title"
					onChange={e => setInputTitle(e.target.value)}
					placeholder="Learn about GTD"
					value={inputTitle}
					required
				/>

				<Button
					disabled={inputTitle.trim().length < 3}
					type="submit"
					variant="success"
				>Create 👶🏻</Button>
			</InputGroup>
		</Form>
	)
}

export default AddTodoForm;
