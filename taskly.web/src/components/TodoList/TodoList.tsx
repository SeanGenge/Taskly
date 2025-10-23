import { type Task } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

type props = {
	todoItems: Task[];
	openModal: (id?: string) => void;
	onDelete: (id: string) => void;
	onToggleComplete: (id: string, checked: boolean) => void;
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
