import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface TodoFormProps {
	initialTitle?: string;
	onSave: (title: string) => Promise<void>;
}

const TodoForm = ({ initialTitle = "", onSave }: TodoFormProps) => {
	const [isPending, setIsPending] = useState(false);
	const [inputTitle, setInputTitle] = useState(initialTitle);
	const trimmedInputTitle = inputTitle.trim();

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		// Set pending state
		setIsPending(true);

		try {
			// 🙋 Tell parent that someone wants to save the form
			await onSave(trimmedInputTitle);

			// Clear input field and reset pending state
			setInputTitle("");
		} catch {
			// Keep the input
		} finally {
			setIsPending(false);
		}
	}

	return (
		<Form onSubmit={handleSubmit} className="mb-3">
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					onChange={e => setInputTitle(e.target.value)}
					placeholder="Learn about GTD"
					value={inputTitle}
					readOnly={isPending}
					required
				/>
			</Form.Group>

			<Button
				disabled={trimmedInputTitle.length < 3 || isPending}
				type="submit"
				variant="success"
			>Save 👶🏻</Button>

			{trimmedInputTitle.length > 0 && trimmedInputTitle.length < 3 && (
				<Form.Text className="text-danger text-small">That's too short todo to do, better do it right away!</Form.Text>
			)}
		</Form>
	)
}

export default TodoForm;
