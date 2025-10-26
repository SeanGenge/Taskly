import { Navbar, Container } from "react-bootstrap";

export default function Navigation() {
	return (
		<Navbar className="mb-3" bg="dark" data-bs-theme="dark">
			<Container className=" d-flex justify-content-center">
				<Navbar.Brand href="/" className="">Taskly</Navbar.Brand>
			</Container>
		</Navbar>
	);
}