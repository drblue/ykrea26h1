import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/TodoAPI";

const useTodo = (todoId: number) => {
	return useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => getTodo(todoId),
	});
}

export default useTodo;
