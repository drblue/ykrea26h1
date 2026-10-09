import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface AddTodoFormProps {
	onAddTodo: (title: string) => void;
}

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
	const [inputTitle, setInputTitle] = useState("");
	const trimmedInputTitle = inputTitle.trim();

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// 🙋 Tell parent that someone wants to create a new todo with the title
		onAddTodo(trimmedInputTitle);

		// Clear input field
		setInputTitle("");
	}

	return (
		<Form onSubmit={handleSubmit} className="mb-3">
			<InputGroup>
				<Form.Control
					aria-label="New todo title"
					onChange={e => setInputTitle(e.target.value)}
					placeholder="Learn about GTD"
					value={inputTitle}
					required
				/>

				<Button
					disabled={trimmedInputTitle.length < 3}
					type="submit"
					variant="success"
				>Create 👶🏻</Button>
			</InputGroup>

			{trimmedInputTitle.length > 0 && trimmedInputTitle.length < 3 && (
				<Form.Text className="text-danger text-small">That's too short todo to do, better do it right away!</Form.Text>
			)}
		</Form>
	)
}

export default AddTodoForm;
