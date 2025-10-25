import { useState, useEffect, useMemo } from "react";
import { getTasks, addTask, deleteTask, updateTask } from "../services/HTTPService";
import type { Task, TaskDTO } from "../types/types";
import TodoList from "../components/TodoList/TodoList";
import TodoModal from "../components/TodoModal/TodoModal";
import AddTask from "../components/AddTask/AddTask";
import SortFilter from "../components/SortFilter/SortFilter";

export default function TodoPage() {
	const [todoItems, setTodoItems] = useState<Task[]>([]);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);
	const [hideCompleted, setHideCompleted] = useState(false);
	
	const filteredTasks = useMemo(() => {
		let list = [...todoItems];
		
		if (hideCompleted) {
			list = list.filter(t => !t.isCompleted);
		}
		
		return list;
	}, [todoItems, hideCompleted]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getTasks();

			setTodoItems(response);
		};

		fetchData();
	}, []);

	async function handleAdd(todoItem: TaskDTO) {
		const created: Task = await addTask(todoItem);

		// Update the todo list with the updated items
		setTodoItems((prev) => [...prev, created]);
	}

	async function handleDelete(id: number) {
		await deleteTask(id);

		// Remove the item from the state
		setTodoItems(prev => prev.filter(t => t.id !== id));
	}

	async function handleUpdate(updatedItem: TaskDTO) {
		// Handles saving the updated todo item
		if (!editingTask) return;

		// Call the back-end API to update the Todo item
		const updated: Task = await updateTask(editingTask.id, updatedItem);

		// Manually update the updated item on the front-end
		setTodoItems(prev => prev.map(t => (t.id === updated.id ? updated : t)));
		setOpenTodoModal(false);
		setEditingTask(null);
	}

	function openModal(id?: number) {
		if (id) {
			// Id is available, attempt to find the item to edit
			// Displays the modal to edit the todo item
			const item = todoItems.find(i => i.id === id) ?? null;
			if (item == null) return;

			setEditingTask(item);
		}

		setOpenTodoModal(true);
	}

	function handleClose() {
		setOpenTodoModal(false);
		setEditingTask(null);
	}

	async function onToggleComplete(id: number, checked: boolean) {
		const item = todoItems.find(i => i.id === id) ?? null;
		if (item == null) return;

		// Update the item on the back-end
		// Flipping the checked value
		const updated = await updateTask(id,
			{
				// Requires the name field to be passed
				name: item.name,
				isCompleted: !checked,
			});

		setTodoItems(prev => prev.map(t => (t.id === updated.id ? updated : t)));
	}

	return (
		<div className="container mt-3 d-flex flex-column">
			<AddTask openModal={openModal} handleAdd={handleAdd} />
			<SortFilter hideCompleted={hideCompleted} onHideCompleted={setHideCompleted} />
			<TodoList todoItems={filteredTasks} onDelete={handleDelete} openModal={openModal} onToggleComplete={onToggleComplete} />
			{openTodoModal && <TodoModal key={editingTask?.id ?? 'new'} open={openTodoModal} handleClose={handleClose} todoItem={editingTask} handleUpdate={handleUpdate} handleAdd={handleAdd} />}
		</div>
	);
}
