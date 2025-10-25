import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Task, Priority } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.css';

type props = {
	todoItems: Task[];
	openModal: (id?: number) => void;
	onDelete: (id: number) => void;
	onToggleComplete: (id: number, checked: boolean) => void;
	priorities: Priority[];
}

export default function TodoList({ todoItems, openModal, onDelete, onToggleComplete, priorities }: props) {
	const [animationParent] = useAutoAnimate();
	
	return (
		<>
			<div ref={animationParent} className={`flex-grow-1 pe-4 mt-md-3 ${styles.todoListScroll}`}>
				{
					todoItems.map(t => {
						return (
							<TodoItem key={t.id} todoItem={t} onDelete={onDelete} openModal={openModal} onToggleComplete={onToggleComplete} priorities={priorities} />
						);
					})
				}
			</div>
			<div className="d-flex justify-content-end me-5 mt-md-2">{todoItems?.length > 0 && todoItems.filter(t => !t.isCompleted).length + ' tasks left'}</div>
		</>
	);
}
