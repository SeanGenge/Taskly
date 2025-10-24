import type { Task } from "../../types/types";
import styles from './TodoItem.module.css';
import { Form, Button, Row, Col } from "react-bootstrap";

type props = {
	todoItem: Task;
	openModal: (id?: number) => void;
	onDelete: (id: number) => void;
	onToggleComplete: (id: number, checked: boolean) => void;
}

export default function TodoItem({ todoItem, openModal, onDelete, onToggleComplete }: props) {
	return (
		<Row className={`${styles.todoItemContainer} ${todoItem.isCompleted ? styles.completed : ''} my-3 rounded`}>
			<Col xs={1} className="d-flex align-items-center justify-content-center">
				<Form.Check
					type="checkbox"
					checked={todoItem.isCompleted}
					// Passing the opposite checked value. Reads nicer in toggle function
					onChange={(e) => onToggleComplete(todoItem.id, !e.currentTarget.checked)}
				/>
			</Col>
			<Col xs={8} className={`d-flex align-items-center ${styles.todoItem} ${todoItem.isCompleted ? styles.completedText : ''}`}>
				{todoItem.name}
			</Col>
			<Col xs={12} md={3} className="d-flex align-items-center justify-content-md-end">
				<Button className={`btn btn-sm ${styles.button}`} variant="outline-warning" onClick={() => openModal(todoItem.id)}>Edit</Button>
				<Button className={`btn btn-sm ${styles.button}`} variant="outline-danger" onClick={() => onDelete(todoItem.id)}>Delete</Button>
			</Col>
		</Row>
	);
}
