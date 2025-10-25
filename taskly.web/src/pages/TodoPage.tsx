import { useState, useEffect, useMemo } from "react";
import { getTasks, addTask, deleteTask, updateTask, getPriorities } from "../services/HTTPService";
import type { Task, TaskDTO, Priority, SortMode, Order } from "../types/types";
import TodoList from "../components/TodoList/TodoList";
import TodoModal from "../components/TodoModal/TodoModal";
import AddTask from "../components/AddTask/AddTask";
import SortFilter from "../components/SortFilter/SortFilter";

export default function TodoPage() {
	const [priorities, setPriorities] = useState<Priority[]>([]);
	const [todoItems, setTodoItems] = useState<Task[]>([]);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);
	const [hideCompleted, setHideCompleted] = useState(false);
	// Sorting tasks
	const [sortMode, setSortMode] = useState<SortMode>("created");
	const [order, setOrder] = useState<Order>("desc");
	
	const filteredTasks = useMemo(() => {
		let list = [...todoItems];
		
		if (hideCompleted) {
			list = list.filter(t => !t.isCompleted);
		}
		
		if (sortMode === "important") {
			if (order === "asc") list = list.sort((t1, t2) => (t1.isImportant > t2.isImportant ? 1 : t1.isImportant < t2.isImportant ? -1 : 0));
			else list = list.sort((t1, t2) => (t1.isImportant < t2.isImportant ? 1 : t1.isImportant > t2.isImportant ? -1 : 0));
		}
		else if (sortMode === "dueDate") {
			if (order === "asc") list = list.sort((t1, t2) => {
				// If a date is null, place them after tasks with due dates
				if (t1.dueDate === null && t2.dueDate !== null) {
					return 1;
				}
				if (t1.dueDate !== null && t2.dueDate === null) {
					return -1;
				}
				
				return new Date(t1.dueDate) > new Date(t2.dueDate) ? 1 : new Date(t1.dueDate) < new Date(t2.dueDate) ? -1 : 0
			});
			else list = list.sort((t1, t2) => (new Date(t1.dueDate) < new Date(t2.dueDate) ? 1 : new Date(t1.dueDate) > new Date(t2.dueDate) ? -1 : 0));
		}
		else if (sortMode === "created") {
			if (order === "asc") list = list.sort((t1, t2) => (new Date(t1.dateCreated) > new Date(t2.dateCreated) ? 1 : new Date(t1.dateCreated) < new Date(t2.dateCreated) ? -1 : 0));
			else list = list.sort((t1, t2) => (new Date(t1.dateCreated) < new Date(t2.dateCreated) ? 1 : new Date(t1.dateCreated) > new Date(t2.dateCreated) ? -1 : 0));
		}
		
		return list;
	}, [todoItems, hideCompleted, order, sortMode]);

	useEffect(() => {
		const fetchData = async () => {
			const responseTasks = await getTasks();
			const responsePriorities = await getPriorities();

			setTodoItems(responseTasks);
			setPriorities(responsePriorities);
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
			<SortFilter sortMode={sortMode} order={order} setSortMode={setSortMode} setOrder={setOrder} hideCompleted={hideCompleted} onHideCompleted={setHideCompleted} />
			<TodoList todoItems={filteredTasks} onDelete={handleDelete} openModal={openModal} onToggleComplete={onToggleComplete} priorities={priorities} />
			{openTodoModal && <TodoModal key={editingTask?.id ?? 'new'} open={openTodoModal} handleClose={handleClose} todoItem={editingTask} handleUpdate={handleUpdate} handleAdd={handleAdd} priorities={priorities} />}
		</div>
	);
}
