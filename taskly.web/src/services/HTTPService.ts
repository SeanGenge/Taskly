import axios from "axios";
import type { Task, TaskDTO, Priority } from "../types/types";

export async function getTasks() {
	// Fetch all tasks from API
	const res = await axios.get<Task[]>("/api/tasks");

	return res.data;
}

export async function getPriorities() {
	// Fetch all priorities
	const res = await axios.get<Priority[]>("/api/priorities");

	return res.data;
}

export async function addTask(todoItem: TaskDTO) {
	// Add task
	const res = await axios.post<Task>("/api/tasks", todoItem);

	return res.data;
}

export async function deleteTask(id: number) {
	// Delete task
	const res = await axios.delete<Task>(`/api/tasks/${id}`);

	return res.data;
}

export async function updateTask(id: number, changes: TaskDTO) {
	// Update task
	const res = await axios.patch<Task>(`/api/tasks/${id}`, changes);

	return res.data;
}
