import axios from "axios";
import type { CreateTodoPayload, Todo } from "../types/Todo.types";

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get<Todo[]>("http://localhost:3000/todos");
	return res.data;
}

/**
 * Create a todo
 */
export const createTodo = async (payload: CreateTodoPayload) => {
	const res = await axios.post<Todo>("http://localhost:3000/todos", payload);
	return res.data;
}

export const fetchTodos = async () => {
	// Make request to API
	const res = await fetch("http://localhost:3000/todos");
	if (!res.ok) {
		throw new Error("Response was not OK!");
	}

	return await res.json() as Todo[];
}
