import { type Task } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

type props = {
	todoItems: Task[];
	openModal: (id?: number) => void;
	onDelete: (id: number) => void;
	onToggleComplete: (id: number, checked: boolean) => void;
}

export default function TodoList({ todoItems, openModal, onDelete, onToggleComplete }: props) {
	return (
		<div>
				{
					todoItems.map(t => {
						return (
							<TodoItem key={t.id} todoItem={t} onDelete={onDelete} openModal={openModal} onToggleComplete={onToggleComplete} />
						);
					})
				}
		</div>
	);
}
