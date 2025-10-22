import axios from "axios";
import { type Task, type AddTodoItemDTO } from "../types/types";

// Fetch all todos from API
export async function getTodos() {
	const res = await axios.get<Task[]>("/api/taskly");
	
	return res.data;
}


// Add todo item
export async function addTodoItem(todoItem: AddTodoItemDTO) {
	const res = await axios.post<Task>("/api/taskly", todoItem);
	
	return res.data;
}

// Delete todo item
export async function deleteTodoItem(id: string) {
	const res = await axios.delete<Task>(`/api/taskly/${id}`);
	
	return res.data;
}