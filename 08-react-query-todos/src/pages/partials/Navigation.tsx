import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";
import useTodos from "../../hooks/useTodos";

const Navigation = () => {
	const { data: todos } = useTodos();

	return (
		<Navbar expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">📝 React Query Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/todos" end>
							Todos
							{" "}
							<Badge pill bg="danger">
								{todos ? todos.length : "-"}
							</Badge>
						</Nav.Link>
						<Nav.Link as={NavLink} to="/todos/create">Create</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
