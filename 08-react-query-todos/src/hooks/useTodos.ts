import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/TodoAPI";

const useTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: getTodos,
	});
}

export default useTodos;
