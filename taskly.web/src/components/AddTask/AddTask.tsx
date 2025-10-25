import { useState, type FormEvent } from "react";
import { type TaskDTO } from "../../types/types";
import { Form } from "react-bootstrap";

type props = {
	openModal: (id?: number) => void;
	handleAdd: (item: TaskDTO) => void;
};

export default function Addtask({ openModal, handleAdd }: props) {
	const [name, setName] = useState<string>("");
	const [validated, setValidated] = useState<boolean>(false);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		const value = name.trim();

		e.preventDefault();

		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);

			return;
		}

		if (!value) return;

		const newTask: TaskDTO = {

			name: name,
		}

		handleAdd(newTask);
		setName("");
		setValidated(false);
	}

	return (
		<div className="row d-flex justify-content-center">
			<div className="col-sm-12 col-md-10">
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Control
						id="description"
						className={`form-control`}
						type="text"
						placeholder="Type your task here..."
						value={name}
						onChange={(e) => setName(e.target.value)}
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
