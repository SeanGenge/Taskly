import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { Container } from "react-bootstrap";

export default function PageLayout() {
	return (
		<>
			<Navigation />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}