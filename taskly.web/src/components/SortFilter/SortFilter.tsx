import { Form } from "react-bootstrap";

type props = {
	hideCompleted: boolean;
	onHideCompleted: (b: boolean) => void;
}

export default function SortFilter({ hideCompleted, onHideCompleted }: props) {
	return (
		<div className="d-flex justify-content-start mt-3">
			<Form.Check
				type='checkbox'
				label='Hide completed'
				id='hideCompleted'
				checked={hideCompleted}
				onChange={(e) => onHideCompleted(e.currentTarget.checked)}
			/>
		</div>
	);
}
