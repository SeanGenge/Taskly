import { useState, useEffect, useMemo } from "react";
import { getTasks, addTask, deleteTask, updateTask, getPriorities } from "../services/HTTPService";
import type { Task, TaskDTO, Priority, SortMode, Order } from "../types/types";
import TodoList from "../components/TodoList/TodoList";
import TodoModal from "../components/TodoModal/TodoModal";
import AddTask from "../components/AddTask/AddTask";
import SortFilter from "../components/SortFilter/SortFilter";
import { compareBoolean, compareDates } from "../utility/utility";

export default function TodoPage() {
	// Stores the priorities from the Database
	const [priorities, setPriorities] = useState<Priority[]>([]);
	// Stores the todo items from the Database
	const [todoItems, setTodoItems] = useState<Task[]>([]);
	// The task that is being edited
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	// true to display the modal and false otherwise
	const [openTodoModal, setOpenTodoModal] = useState<boolean>(false);
	// filter to hide completed tasks
	const [hideCompleted, setHideCompleted] = useState(false);
	// Current sort mode. Used to sort the tasks
	const [sortMode, setSortMode] = useState<SortMode>("created");
	// Current order of the sort (Asc or Desc)
	const [order, setOrder] = useState<Order>("desc");
	
	// Stores the tasks after filtering out the tasks or sorting them. This is used to pass onto the other components
	const filteredTasks = useMemo(() => {
		let list = [...todoItems];
		
		if (hideCompleted) {
			list = list.filter(t => !t.isCompleted);
		}
		
		// Sort the list based on the sortMode and order
		list.sort((a: Task, b: Task) => {
			switch (sortMode) {
				case "important":
					return compareBoolean(a.isImportant, b.isImportant, order);

				case "dueDate":
					return compareDates(a.dueDate, b.dueDate, order);

				case "created":
					return compareDates(a.dateCreated, b.dateCreated, order);

				default:
					return 0;
			}
		});
		
		
		return list;
	}, [todoItems, hideCompleted, order, sortMode]);

	useEffect(() => {
		// Retrieves the data from the database and stores them
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
				priorityId: item.priorityId
			});

		setTodoItems(prev => prev.map(t => (t.id === updated.id ? updated : t)));
	}

	return (
		<>
			<AddTask openModal={openModal} handleAdd={handleAdd} priorities={priorities} />
			<SortFilter sortMode={sortMode} order={order} setSortMode={setSortMode} setOrder={setOrder} hideCompleted={hideCompleted} onHideCompleted={setHideCompleted} />
			<TodoList todoItems={filteredTasks} onDelete={handleDelete} openModal={openModal} onToggleComplete={onToggleComplete} priorities={priorities} />
			{openTodoModal && <TodoModal key={editingTask?.id ?? 'new'} open={openTodoModal} handleClose={handleClose} todoItem={editingTask} handleUpdate={handleUpdate} handleAdd={handleAdd} priorities={priorities} />}
		</>
	);
}
