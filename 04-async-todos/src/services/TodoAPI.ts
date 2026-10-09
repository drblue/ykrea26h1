import type { Todo } from "../types/Todo.types";

export const fetchTodos = async () => {
	// Make request to API
	const res = await fetch("http://localhost:3000/todos");
	if (!res.ok) {
		throw new Error("Response was not OK!");
	}

	return await res.json() as Todo[];
}
