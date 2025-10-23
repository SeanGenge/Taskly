import { type Task } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

type props = {
	todoItems: Task[];
	onUpdate: (id: string) => void;
	onDelete: (id: string) => void;
}

export default function TodoList({ todoItems, onUpdate, onDelete }: props) {
	return (
		<div>
				{
					todoItems.map(t => {
						return (
							<TodoItem key={t.id} todoItem={t} onDelete={onDelete} onUpdate={onUpdate} />
						);
					})
				}
		</div>
	);
}
