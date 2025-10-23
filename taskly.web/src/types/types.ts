export type Task = {
	id: string;
	description: string;
	isCompleted: boolean;
	time: string
};

export type TodoItemDTO = {
	description: string;
	isCompleted?: boolean;
	time?: string;
};