import axios from "axios";
import type { Task, TaskDTO } from "../types/types";

// Fetch all todos from API
export async function getTodos() {
	const res = await axios.get<Task[]>("/api/taskly");
	
	return res.data;
}


// Add todo item
export async function addTodoItem(todoItem: TaskDTO) {
	const res = await axios.post<Task>("/api/taskly", todoItem);
	
	return res.data;
}

// Delete todo item
export async function deleteTodoItem(id: number) {
	const res = await axios.delete<Task>(`/api/taskly/${id}`);
	
	return res.data;
}

// Update todo item
export async function updateTodoItem(id: number, changes: TaskDTO) {
	const res = await axios.patch<Task>(`/api/taskly/${id}`, changes);
	
	return res.data;
}
