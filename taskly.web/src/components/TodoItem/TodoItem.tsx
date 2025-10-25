import type { Task, Priority } from "../../types/types";
import styles from './TodoItem.module.css';
import { Form, Button, Row, Col } from "react-bootstrap";
import { format } from 'date-fns';

type props = {
	todoItem: Task;
	openModal: (id?: number) => void;
	onDelete: (id: number) => void;
	onToggleComplete: (id: number, checked: boolean) => void;
	priorities: Priority[];
}

export default function TodoItem({ todoItem, openModal, onDelete, onToggleComplete, priorities }: props) {
	function priorityInfo(p: number) {
		switch (p) {
			case 1:
			default:
				return { priorityColour: 'text-success' };
			case 2: return { priorityColour: 'text-warning' };
			case 3: return { priorityColour: 'text-danger' };
		}
	}
	
	const { priorityColour } = priorityInfo(priorities?.find(p => p.id === todoItem?.priorityId)?.priorityLevel ?? 1);
	
	return (
		<Row className={`${styles.todoItemContainer} ${todoItem.isCompleted ? styles.completed : ''} my-3 rounded`}>
			<Col xs={4} md={2} lg={1} className="d-flex align-items-center justify-content-left">
				<Form.Check
					type="checkbox"
					checked={todoItem.isCompleted}
					// Passing the opposite checked value. Reads nicer in toggle function
					onChange={(e) => onToggleComplete(todoItem.id, !e.currentTarget.checked)}
				/>
				<i className={`bi bi-arrow-up me-2 ms-4 ${priorityColour}`} title={priorities.find(p => p.id === todoItem.priorityId)?.name + " priority"}></i>
				{todoItem?.isImportant && <i className={`bi bi-flag ${styles.importantTag}`} title="Important task"></i>}
			</Col>
			<Col xs={9} md={6} lg={6} className={`d-flex align-items-center ${styles.todoItem} ${todoItem.isCompleted ? styles.completedText : ''}`}>
				{todoItem.name}
			</Col>
			<Col xs={12} md={4} lg={5} className="d-flex align-items-center justify-content-md-end">
				{todoItem?.dueDate &&
					<>
						{new Date(todoItem.dueDate) < new Date() && <i className="bi bi-exclamation-triangle me-2 text-danger" title="Late"></i>}
						<span className="d-none d-lg-inline me-4" title="Due date">Due: {format(todoItem.dueDate, 'dd/MM/yyyy')}</span>
					</>
				}
				<Button className={`btn btn-sm ${styles.button}`} variant="outline-warning" onClick={() => openModal(todoItem.id)}><i className="bi bi-pencil"></i></Button>
				<Button className={`btn btn-sm ${styles.button}`} variant="outline-danger" onClick={() => onDelete(todoItem.id)}><i className="bi bi-trash"></i></Button>
			</Col>
		</Row>
	);
}
