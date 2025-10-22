export type Task = {
	id: string;
	description: string;
	isCompleted: boolean;
	time: string
};

export type AddTodoItemDTO = {
	description: string;
	isCompleted?: boolean;
	time?: string;
};