import { useParams } from "react-router";

const TodoPage = () => {
	const { id } = useParams();
	console.log("id:", id);
	console.log("typeof id:", typeof id);

	return (
		<>
			<h1>Todo ID {id}</h1>
		</>
	)
}

export default TodoPage;
