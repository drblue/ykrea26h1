import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/TodoAPI";

const useTodo = (todoId: number) => {
	return useQuery({
		queryKey: ["todos", { id: todoId }],
		queryFn: () => getTodo(todoId),
	});
}

export default useTodo;
