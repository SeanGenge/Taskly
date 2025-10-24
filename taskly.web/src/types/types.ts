export type Task = {
	id: number;
	name: string;
	description: string;
	isCompleted: boolean;
	dueDate: string;
	isImportant: boolean;
	dateCreated: string;
	priorityId: number;
};

export type TaskDTO = {
	name?: string;
	description?: string;
	isCompleted?: boolean;
	dueDate?: string;
	dateCompleted?: string;
	isImportant?: boolean;
	dateCreated?: string;
	priorityId?: number;
};