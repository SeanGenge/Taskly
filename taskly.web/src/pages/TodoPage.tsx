import { useState, useEffect } from "react";
import { getTodos, addTodoItem, deleteTodoItem } from "../services/HTTPService";
import type { Task, AddTodoItemDTO } from "../types/types";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";

export default function TodoPage() {
	const [todoItems, setTodoItems] = useState<Task[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getTodos();
			setTodoItems(response);
			console.log(response);
		};
		
		fetchData();
	}, []);

	async function handleAdd(todoItem: AddTodoItemDTO) {
		const created = await addTodoItem(todoItem);
		
		// Update the todo list with the updated items
		setTodoItems((prev) => [...prev, created]);
	}
	
	async function handleDelete(id: string) {
		await deleteTodoItem(id);
		
		// Remove the item from the state
		setTodoItems(prev => prev.filter(t => t.id !== id));
	}

	return (
		<div className="container mt-3">
			<TodoForm onAdd={handleAdd} />
			<TodoList todoItems={todoItems} onDelete={handleDelete} />
		</div>
	);
}
