import { useState, type FormEvent } from "react";
import { type AddTodoItemDTO } from "../../types/types";
import styles from './TodoForm.module.css';

type props = {
	onAdd: (item: AddTodoItemDTO) => void;
};

export default function TodoForm({ onAdd }: props) {
	const [description, setDescription] = useState("");

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		const value = description.trim();
		
		e.preventDefault();
		if (!value) return;
		
		const newTodoItem: AddTodoItemDTO = {
			description: description
		}
		
		onAdd(newTodoItem);
		setDescription("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="row d-flex justify-content-center">
				<div className="col-sm-12 col-md-10">
					<input
						id="description"
						className={`form-control ${styles.addItem}`}
						type="text"
						placeholder="Type your task here..."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						aria-label="Add new task"
					/>
				</div>
				<div className="col-sm-12 col-md-2 my-3 my-md-0">
					<button type="submit" className="btn btn-primary w-100">
						Add Task
					</button>
				</div>
			</div>
		</form>
	);
}
