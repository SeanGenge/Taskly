import { type Task } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

type props = {
	todoItems: Task[];
	onDelete: (id: string) => void
}

export default function TodoList({ todoItems, onDelete }: props) {
	return (
		<div>
				{
					todoItems.map(t => {
						return (
							<TodoItem todoItem={t} onDelete={onDelete} />
						);
					})
				}
		</div>
	);
}
