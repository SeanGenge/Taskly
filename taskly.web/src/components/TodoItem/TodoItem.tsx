import type { Task } from "../../types/types";
import styles from './TodoItem.module.css';
import { Form, Button, Row, Col } from "react-bootstrap";
import { format } from 'date-fns';

type props = {
	todoItem: Task;
	openModal: (id?: number) => void;
	onDelete: (id: number) => void;
	onToggleComplete: (id: number, checked: boolean) => void;
}

export default function TodoItem({ todoItem, openModal, onDelete, onToggleComplete }: props) {
	return (
		<Row className={`${styles.todoItemContainer} ${todoItem.isCompleted ? styles.completed : ''} my-3 rounded`}>
			<Col xs={3} md={1} className="d-flex align-items-center justify-content-left">
				<Form.Check
					type="checkbox"
					checked={todoItem.isCompleted}
					// Passing the opposite checked value. Reads nicer in toggle function
					onChange={(e) => onToggleComplete(todoItem.id, !e.currentTarget.checked)}
				/>
				{todoItem?.isImportant && <i className={`bi bi-flag ms-4 ${styles.importantTag}`}></i>}
			</Col>
			<Col xs={9} md={7} className={`d-flex align-items-center ${styles.todoItem} ${todoItem.isCompleted ? styles.completedText : ''}`}>
				{todoItem.name}
			</Col>
			<Col xs={12} md={4} className="d-flex align-items-center justify-content-md-end">
				{todoItem?.dueDate && <span className="d-none d-lg-inline me-4">Due: {format(todoItem.dueDate, 'dd/MM/yyyy')}</span>}
				<Button className={`btn btn-sm ${styles.button}`} variant="outline-warning" onClick={() => openModal(todoItem.id)}><i className="bi bi-pencil"></i></Button>
				<Button className={`btn btn-sm ${styles.button}`} variant="outline-danger" onClick={() => onDelete(todoItem.id)}><i className="bi bi-trash"></i></Button>
			</Col>
		</Row>
	);
}
