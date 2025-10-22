import { type Task } from "../../types/types";
import styles from './TodoItem.module.css';

type props = {
	todoItem: Task;
	onDelete: (id: string) => void
}

export default function TodoItem({ todoItem, onDelete }: props) {
	return (
		<div className={`${styles.todoItemContainer} row my-3 rounded`} key={todoItem.id}>
			<div className={`col-8 ${styles.todoItem}`}>
				<span>{todoItem.description}</span>
			</div>
			<div className="col-4 d-flex align-items-center justify-content-end">
				<button className="btn btn-danger btn-sm" onClick={() => onDelete(todoItem.id)}>Delete</button>
			</div>
		</div>
	);
}
