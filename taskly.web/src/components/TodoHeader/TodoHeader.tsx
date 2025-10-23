import { useState, type FormEvent } from "react";
import { type TodoItemDTO } from "../../types/types";
import styles from './TodoHeader.module.css';
import { Form } from "react-bootstrap";

type props = {
	openModal: (id?: string) => void;
	handleAdd: (item: TodoItemDTO) => void;
};

function TodoHeader({ openModal, handleAdd }: props) {
	const [description, setDescription] = useState<string>("");
	const [validated, setValidated] = useState<boolean>(false);
	
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		const value = description.trim();

		e.preventDefault();

		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);

			return;
		}
		
		if (!value) return;

		const newTodoItem: TodoItemDTO = {
			description: description
		}

		handleAdd(newTodoItem);
		setDescription("");
		setValidated(false);
	}
	
	return (
		<div className="row d-flex justify-content-center">
			<div className="col-sm-12 col-md-10">
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Control
						id="description"
						className={`form-control ${styles.input}`}
						type="text"
						placeholder="Type your task here..."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						aria-label="Add new task"
						required
					/>
					<Form.Control.Feedback type="invalid">Please write a task</Form.Control.Feedback>
				</Form>
			</div>
			<div className="col-sm-12 col-md-2 my-3 my-md-0">
				<button className="btn btn-primary w-100" onClick={() => openModal()}>
					Add Advanced Task
				</button>
			</div>
		</div>
	)
}

export default TodoHeader
