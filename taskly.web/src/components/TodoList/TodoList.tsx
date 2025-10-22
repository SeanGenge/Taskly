import { type Task } from "../../types/types";

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
							<div className="todo-item row my-3 rounded" key={t.id}>
								<div className="col-8">
									<span>{t.description}</span>
								</div>
								<div className="col-4 d-flex align-items-center justify-content-end">
									<button className="btn btn-danger btn-sm" onClick={() => onDelete(t.id)}>Delete</button>
								</div>
							</div>
						);
					})
				}
		</div>
	);
}
