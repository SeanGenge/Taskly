import { useState, useEffect } from "react";
import { getTodos, addTodoItem, deleteTodoItem, updateTodoItem } from "../services/HTTPService";
import type { Task, TodoItemDTO } from "../types/types";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import TodoModal from "../components/TodoModal/TodoModal";

export default function TodoPage() {
	const [todoItems, setTodoItems] = useState<Task[]>([]);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getTodos();
			setTodoItems(response);
		};
		
		fetchData();
	}, []);

	async function handleAdd(todoItem: TodoItemDTO) {
		const created = await addTodoItem(todoItem);
		
		// Update the todo list with the updated items
		setTodoItems((prev) => [...prev, created]);
	}
	
	async function handleDelete(id: string) {
		await deleteTodoItem(id);
		
		// Remove the item from the state
		setTodoItems(prev => prev.filter(t => t.id !== id));
	}
	
	async function handleSave(updatedItem: TodoItemDTO) {
		// Handles saving the updated todo item
		if (!editingTask) return;
		
		// Call the back-end API to update the Todo item
		const updated = await updateTodoItem(editingTask.id,
		{
			description: updatedItem.description,
		});
		
		// Manually update the updated item on the front-end
		setTodoItems(prev => prev.map(t => (t.id === updated.id ? updated : t)));
		setOpenTodoModal(false);
		setEditingTask(null);
	}
	
	function handleUpdate(id: string) {
		// Displays the modal to edit the todo item
		const item = todoItems.find(i => i.id === id) ?? null;
		
		if (item == null) return;
		
		setEditingTask(item);
		setOpenTodoModal(true);
	}
	
	function handleClose() {
		setOpenTodoModal(false);
		setEditingTask(null);
	}

	return (
		<div className="container mt-3">
			<TodoForm onAdd={handleAdd} />
			<TodoList todoItems={todoItems} onDelete={handleDelete} onUpdate={handleUpdate} />
			<TodoModal open={openTodoModal} handleClose={handleClose} todoItem={editingTask} handleSave={handleSave} />
		</div>
	);
}
