import { useState } from "react";

interface AddPostFormProps {
	onAddPost: (title: string) => void;
}

const AddPostForm = ({ onAddPost }: AddPostFormProps) => {
	const [inputPostTitle, setInputPostTitle] = useState("");

	const handleFormSubmit = (e: React.SubmitEvent) => {
		// Stop form from being submitted (and causing a page reload)
		e.preventDefault();

		// Let parent know that someone wants to create a new post
		onAddPost(inputPostTitle);

		// Clear input field
		setInputPostTitle("");
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="input-group mb-3">
				<input
					aria-label="What do you want to tell the world?"
					className="form-control"
					onChange={e => setInputPostTitle(e.target.value)}
					placeholder="I love react!"
					type="text"
					value={inputPostTitle}
					required
				/>

				<button
					className="btn btn-primary"
					type="submit"
				>Send it!</button>
			</div>
		</form>
	)
}

export default AddPostForm;
